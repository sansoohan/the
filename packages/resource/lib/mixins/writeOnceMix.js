'use strict'

/**
 * Mixin for writeOnce
 * @memberof module:@the-/resource.mixins
 * @function writeOnceMix
 * @param {function()} Class
 * @returns {function()}
 */
/** @lends module:@the-/resource.mixins.writeOnceMix */
function writeOnceMix(Class) {
  /**
   * @memberof module:@the-/resource.mixins.writeOnceMix
   * @inner
   */
  class WriteOnce extends Class {
    destroy() {
      this.throwWriteOnceError('destroy')
    }

    destroyBulk() {
      this.throwWriteOnceError('destroyBulk')
    }

    throwWriteOnceError(operation) {
      const resourceName =
        this.resourceName || this.name || this.constructor.name
      throw new Error(
        `Can not ${operation} on "${resourceName}" because it is marked as write-once`,
      )
    }

    update() {
      this.throwWriteOnceError('update')
    }

    updateBulk() {
      this.throwWriteOnceError('updateBulk')
    }
  }

  return WriteOnce
}

module.exports = writeOnceMix
