// Code generated by coz. DO NOT EDIT.
/* eslint-disable */
/**
 * @description AST (abstract syntax tree) parser
 * @license MIT
 * @module @the-/ast
 * @typicalname ast
 * @version 16.0.2
 */
'use strict'

const analyser_ = require('./analyser')
const constants_ = require('./constants')
const finder_ = require('./finder')
const parse_ = require('./parse')
const walk_ = require('./walk')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.analyser = analyser_
exports.constants = constants_
exports.finder = finder_
exports.parse = parse_
exports.walk = walk_

module.exports = {
  analyser: analyser_,
  constants: constants_,
  finder: finder_,
  parse: parse_,
  walk: walk_,
}
