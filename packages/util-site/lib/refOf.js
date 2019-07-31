'use strict'

/**
 * Convert into ref
 * @memberof module:@the-/util-site
 * @function refOf
 */
const { refTo } = require('clay-resource-ref')
const { unlessProduction } = require('@the-/check')

/** @lends module:@the-/util-site.refOf */
function refOf(entity) {
  if (!entity) {
    return null
  }
  unlessProduction(() => {
    if (!entity.$$as) {
      console.warn('Invalid entity:', entity)
    }
  })
  return refTo(entity.$$as, entity.id)
}

module.exports = refOf
