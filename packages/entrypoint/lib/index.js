// Code generated by coz. DO NOT EDIT.
/**
 * @description Browser entrypoint for the-framework
 * @license MIT
 * @module @the-/entrypoint
 * @typicalname entrypoint
 * @version 15.4.5
 */
'use strict'

const helpers_ = require('./helpers')
const history_ = require('./history')
const mount_ = require('./mount')
const online_ = require('./online')
const patch_ = require('./patch')
const quelize_ = require('./quelize')
const secure_ = require('./secure')
const singleton_ = require('./singleton')
const workers_ = require('./workers')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.helpers = helpers_
exports.history = history_
exports.mount = mount_
exports.online = online_
exports.patch = patch_
exports.quelize = quelize_
exports.secure = secure_
exports.singleton = singleton_
exports.workers = workers_

module.exports = {
  helpers: helpers_,
  history: history_,
  mount: mount_,
  online: online_,
  patch: patch_,
  quelize: quelize_,
  secure: secure_,
  singleton: singleton_,
  workers: workers_,
}
