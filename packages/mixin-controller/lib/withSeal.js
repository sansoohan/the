'use strict'

/**
 * Wrap controller with seal
 * @function withSeal
 */
const { TheInvalidParameterError } = require('@the-/error')

/** @lends withSeal */
function withSeal(Class) {
  class WithSeal extends Class {
    async _assertSeal(sealString, envelop) {
      const {
        app: { seal },
      } = this
      const ok = seal.verify(sealString, envelop)
      if (!ok) {
        throw new TheInvalidParameterError('Invalid parameter', envelop)
      }
    }

    async _sealFor(envelop) {
      const {
        app: { seal },
      } = this
      return seal.seal(envelop)
    }
  }

  return WithSeal
}

module.exports = withSeal
