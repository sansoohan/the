/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheRefresher = require('./TheRefresher')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheRefresher = TheRefresher
exports.create = create

module.exports = Object.assign(lib, {
  TheRefresher,
})