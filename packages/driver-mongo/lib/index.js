// Code generated by coz. DO NOT EDIT.
/**
 * @description Mongo driver for the-db
 * @license MIT
 * @module @the-/driver-mongo
 * @typicalname driverMongo
 * @version 15.4.5
 */
'use strict'

const MongoDriver_ = require('./MongoDriver')
const create_ = require('./create')
const mixins_ = require('./mixins')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.MongoDriver = MongoDriver_
exports.create = create_
exports.mixins = mixins_

module.exports = {
  MongoDriver: MongoDriver_,
  create: create_,
  mixins: mixins_,
}
