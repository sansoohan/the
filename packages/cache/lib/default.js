/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheCache = require('./TheCache')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheCache = TheCache
exports.create = create

module.exports = Object.assign(lib, {
  TheCache,
  create,
})