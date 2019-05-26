// Code generated by coz. DO NOT EDIT.
/**
 * @description Performance measures for the-framework
 * @license MIT
 * @module @the-/metrics
 * @typicalname metrics
 * @version 15.4.5
 */
'use strict'

const TheMetrics_ = require('./TheMetrics')
const counters_ = require('./counters')
const create_ = require('./create')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheMetrics = TheMetrics_
exports.counters = counters_
exports.create = create_

module.exports = default__
