'use strict'

/**
 * Mixin for serialize
 * @memberof module:@the-/rtc.constants.mixins
 * @function serializeMix
 * @param {function()} Class
 * @returns {function()} Class
 */
const { Converters, ThePack } = require('@the-/pack')

const { decode, encode } = new ThePack({
  convert: Converters.UInt8ArrayConverter,
})

/** @lends module:@the-/rtc.constants.mixins.serializeMix */
function serializeMix(Class) {
  class SerializeMixed extends Class {
    deserializeChannelData(data, options = {}) {
      return decode(Buffer.from(new Uint8Array(data)))
    }

    serializeChannelData(data, options = {}) {
      return encode(data)
    }
  }

  return SerializeMixed
}

module.exports = serializeMix
