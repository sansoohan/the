'use strict'

/**
 * Define koa middleware register ctx values
 * @memberof module:@the-/server.helpers
 * @function ctxInjector
 * @param {function()} creators
 * @returns {function()}
 */
function ctxInjector(injector) {
  return async function middleware(ctx, next) {
    Object.assign(ctx, injector(ctx))
    await next()
  }
}

module.exports = ctxInjector
