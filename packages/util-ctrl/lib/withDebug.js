'use strict'
/**
 * Wrap controller with debug
 * @memberof module:@the-/util-ctrl
 * @function withDebug
 * @param {Object} ctrl
 * @returns {Object} Wrapped ctrl
 */
const { cleanup } = require('asobj')
const Debug = require('debug')
const { inspect } = require('util')
const { isProduction } = require('@the-/check')
const {
  omitLongString,
} = require('./helpers')

/** @lends module:@the-/util-ctrl.withDebug */
function withDebug (ctrl, options = {}) {
  const {
    contextFilter = ({ client }) => client,
    debugKey = `app:ctrl`,
  } = options
  const debug = Debug(debugKey)

  if (isProduction()) {
    return {
      _debug: () => null,
      ...ctrl,
    }
  }
  return Object.assign({
      _debug: debug,
    },
    ...Object.entries(ctrl).map(((name, original) => {
        return {
          [name]: Object.assign(
            async function debugProxy (...args) {
              const startAt = new Date()
              let result
              let exception
              try {
                result = await original.apply(this, args)
              } catch (e) {
                debug('exception', e)
                exception = e
                throw e
              } finally {
                const took = new Date() - startAt
                const context = contextFilter(this)
                const info = omitLongString({
                  args,
                  context,
                  exception,
                  result,
                  took,
                })
                debug(
                  `\`.${name}()\``,
                  inspect(cleanup(info), {
                    breakLength: Infinity,
                    depth: 3,
                    maxArrayLength: 3,
                  }),
                )
              }
              return result
            },
            { original },
          )
        }
      })
    )
  )
}

module.exports = withDebug