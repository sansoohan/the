/**
 * Doc script for the-projects
 * @module @the-/script-doc
 * @version 15.2.2
 */

'use strict'

const doc = require('./doc')
const lib = doc.bind(this)

Object.assign(lib, {
  doc,
})

module.exports = lib
