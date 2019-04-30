// Code generated by coz. DO NOT EDIT.
/**
 * @namespace converters
 * @memberOf module:@the-/driver-sequelize
 * @access protected
 * @description Converter functions
 */
'use strict'

const convertInbound_ = require('./convertInbound')
const convertOutbound_ = require('./convertOutbound')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.convertInbound = convertInbound_
exports.convertOutbound = convertOutbound_

module.exports = {
  convertInbound: convertInbound_,
  convertOutbound: convertOutbound_,
}
