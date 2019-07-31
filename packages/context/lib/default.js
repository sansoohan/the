'use strict'

/**
 * Alias of {@link module:@the-/context.create}
 * @memberof module:@the-/context
 * @function default
 */
const create = require('./create')
const TheContext = require('./TheContext')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheContext,
  create,
})
