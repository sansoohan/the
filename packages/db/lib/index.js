// Code generated by coz. DO NOT EDIT.
/**
 * @module @the-/db
 * @version 15.4.6
 * @description DB for the-framework
 * @typicalname db
 * @license MIT
 */
'use strict'

const TheDB_ = require('./TheDB')
const create_ = require('./create')
const driverFromEnv_ = require('./driverFromEnv')
const execForEnv_ = require('./execForEnv')
const helpers_ = require('./helpers')
const mixins_ = require('./mixins')
const resources_ = require('./resources')
const setupForEnv_ = require('./setupForEnv')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheDB = TheDB_
exports.create = create_
exports.driverFromEnv = driverFromEnv_
exports.execForEnv = execForEnv_
exports.helpers = helpers_
exports.mixins = mixins_
exports.resources = resources_
exports.setupForEnv = setupForEnv_

module.exports = default__
