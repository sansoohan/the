/**
 * @class TheRTCClient
 */
'use strict'

const argx = require('argx')
const uuid = require('uuid')
const { get } = require('@the-/window')
const { ChannelNames, IOEvents, PeerPurposes } = require('./constants')
const {
  assertMix,
  channelMix,
  mediaMix,
  peerMix,
  promiseMix,
  serializeMix,
  socketMix,
} = require('./mixins')

const TheRTCClientBase = [
  channelMix,
  assertMix,
  mediaMix,
  promiseMix,
  socketMix,
  serializeMix,
  peerMix,
].reduce((Class, mix) => mix(Class), class Base {})

/** @lends TheRTCClient */
class TheRTCClient extends TheRTCClientBase {
  constructor(options = {}) {
    super()
    const {
      info = {},
      mediaConstrains = { audio: true, video: true },
      onLocal,
      onRemote,
      rid = uuid.v4(),
    } = options
    this.room = null
    this.media = this.createMedia(mediaConstrains)
    this.iceServers = null
    this.onRemote = onRemote
    this.onLocal = onLocal
    this._rid = rid
    this._info = info
  }

  /**
   * Audio enabled or not
   * @returns {Boolean}
   */
  get audioEnabled() {
    return this.media.audioEnabled
  }

  /**
   * Additional info
   * @returns {Object}
   */
  get info() {
    return this._info
  }

  /**
   * RTC client id
   * @returns {string}
   */
  get rid() {
    return this._rid
  }

  /**
   * Status
   * @returns {Object}
   */
  get state() {
    const { audioEnabled, info, rid, room, videoEnabled } = this
    return {
      audioEnabled,
      info,
      rid,
      roomName: room && room.name,
      videoEnabled,
    }
  }

  /**
   * Video enabled
   * @returns {Boolean}
   */
  get videoEnabled() {
    return this.media.videoEnabled
  }

  getRoomClientFor(rid) {
    const clients = this.room && this.room.clients
    if (!clients) {
      return null
    }
    return clients.find((client) => client.rid === rid)
  }

  pidFor(from, to, purpose) {
    return `${from}=>${to}#${purpose}`
  }

  subscribe(topic, callback) {
    return this.subscribePubSubChannel(topic, callback)
  }

  async answerToPeerOffer(offer) {
    const {
      iceServers,
      media: { stream: localStream },
      rid: local,
    } = this
    const { desc, from: remote, pid, purpose } = offer
    const peer = await this.createAnswerPeer({
      iceServers,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remote })
      },
      onStream: (stream, { peer }) => {
        const client = this.getRoomClientFor(remote)
        this.onRemote && this.onRemote({ ...client, peer, stream })
      },
      pid,
      purpose,
      remoteDescription: desc,
      stream: localStream,
    })
    this.emitSocketEvent(IOEvents.PEER_ANSWER, {
      desc: peer.localDescription,
      from: local,
      pid,
      purpose,
      to: remote,
    })
  }

  /**
   * Connect to server
   * @param {string} url Server url
   * @param {Object} [options] - Optional settings
   * @returns {Promise<void>}
   */
  async connect(url, options) {
    // Parse arguments
    {
      const args = argx(arguments)
      url = args.shift('string') || get('location.origin')
      options = args.pop('object') || {}
    }
    const { forceNew = true, path } = options
    const { rid } = this
    const socket = this.createSocket(url, {
      forceNew,
      path,
      query: { rid },
    })
    this.registerSocket(socket)

    this.listenToSocketEvents({
      [IOEvents.PEER_ICE]: (coming) => {
        void this.receivePeerIce(coming)
      },
      [IOEvents.PEER_OFFER]: (offer) => {
        void this.receivePeerOffer(offer)
      },
      [IOEvents.ROOM_STATE]: (roomState) => {
        this.room = roomState
      },
    })
    await this.asPromise(
      (resolve) => {
        socket.once(IOEvents.CONFIG_ICE_SERVERS, ({ iceServers }) => {
          this.iceServers = iceServers
          resolve()
        })
      },
      {
        label: 'WAIT_ICE_SERVER',
        timeout: 10 * 1000,
      },
    )
  }

  /**
   * Disconnect from signaling server
   * @returns {Promise<void>}
   */
  async disconnect() {
    if (this.room) {
      await this.leave()
    }
    this.destroySocket()
  }

  async establishPeer(client, purpose) {
    const { rid: remote } = client
    const { iceServers, rid: local, socket } = this
    const pid = this.pidFor(local, remote, purpose)
    const peer = await this.createOfferPeer({
      iceServers,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remote })
      },
      onIceCandidate: (ice) => {
        this.emitSocketEvent(IOEvents.PEER_ICE, {
          from: local,
          ice,
          pid,
          to: remote,
        })
      },
      onStream: (stream, { peer }) => {
        this.onRemote &&
          this.onRemote({
            ...client,
            peer,
            stream,
          })
      },
      pid,
      purpose,
      stream: this.media.stream,
    })
    const answer = await this.asPromise(
      (resolve) => {
        const onAnswer = (answer) => {
          if (answer.to !== this.rid) {
            return
          }
          socket.off(IOEvents.PEER_ANSWER, onAnswer)
          resolve(answer)
        }
        socket.on(IOEvents.PEER_ANSWER, onAnswer)
        this.emitSocketEvent(IOEvents.PEER_OFFER, {
          desc: peer.localDescription,
          from: local,
          pid,
          purpose,
          to: remote,
        })
      },
      {
        label: 'WAITING_PEER_ANSWER',
      },
    )
    await this.setPeerRemoteDesc(pid, answer.desc)
    return peer
  }

  async join(roomName) {
    this.assertNotHasRoom()
    await this.media.startIfNeeded().catch(() => {
      // TODO handle error
    })
    const { roomState } = await this.emitSocketEventWithAck(
      IOEvents.ROOM_JOIN,
      { roomName },
      {
        failEvent: IOEvents.ROOM_JOIN_FAIL,
        successEvent: IOEvents.ROOM_JOIN_SUCCESS,
      },
    )
    this.room = roomState
    await this.syncState()
    for (const client of roomState.clients) {
      if (client.rid === this.rid) {
        continue
      }
      await this.establishPeer(client, PeerPurposes.DEFAULT)
    }
  }

  async leave() {
    this.assertHasRoom()
    await this.media.stopIfNeeded()
    const { room } = this
    await this.emitSocketEventWithAck(
      IOEvents.ROOM_LEAVE,
      { roomName: room.name },
      {
        failEvent: IOEvents.ROOM_LEAVE_FAIL,
        successEvent: IOEvents.ROOM_LEAVE_SUCCESS,
      },
    )

    // Cleanup
    {
      await this.destroyAllPeers()
    }

    this.room = null
  }

  /**
   * Publish topic via pub-sub channel
   * @param {string} topic - Topic name
   * @param {Object} payload - Payload data
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async publish(topic, payload, options = {}) {
    const { purpose = PeerPurposes.DEFAULT } = options
    const peers = this.getPeersByPurpose(purpose)
    for (const peer of peers) {
      const channel = await this.peerDataChannel(
        peer.extra.pid,
        ChannelNames.PUB_SUB_CHANNEL,
      )
      const serialized = this.serializeChannelData({
        payload,
        topic,
      })
      await channel.send(serialized)
    }
  }

  async receivePeerIce(coming) {
    const { ice, pid, to } = coming
    if (to !== this.rid) {
      console.warn(`[TheRTCClient] Invalid ice:`, coming)
      return
    }
    if (!ice) {
      return
    }
    try {
      await this.setPeerICECandidate(pid, ice)
    } catch (e) {
      console.warn(`[TheRTCClient] ${e.message}`, ice)
      return
    }
  }

  async receivePeerOffer(offer) {
    if (offer.to !== this.rid) {
      console.warn(`[TheRTCClient] Invalid offer:`, offer)
      return
    }
    await this.answerToPeerOffer(offer)
  }

  async syncState() {
    const {
      media: { stream },
      onLocal,
      state,
    } = this
    this.emitSocketEvent(IOEvents.CLIENT_STATE, state)
    onLocal && onLocal({ ...state, stream })
  }

  async toggleAudioEnabled(enabled) {
    this.assertHasRoom()
    this.media.toggleAudioEnabled(enabled)
    await this.syncState()
  }

  async toggleScreenShare(enabled) {
    this.assertHasRoom()
    if (enabled) {
      this.emitSocketEvent(IOEvents.SCREEN_SHARE_START)
    } else {
      this.emitSocketEvent(IOEvents.SCREEN_SHARE_STOP)
    }
  }

  async toggleVideoEnabled(enabled) {
    this.assertHasRoom()
    this.media.toggleVideoEnabled(enabled)
    await this.syncState()
  }
}

module.exports = TheRTCClient