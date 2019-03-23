/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheHandle = require('./TheHandle')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.create = create
exports.TheHandle = TheHandle

module.exports = Object.assign(lib, {
  TheHandle,
  create,
  helpers,
})