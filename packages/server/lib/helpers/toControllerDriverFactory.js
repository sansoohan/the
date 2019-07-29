/**
 * @memberof module:@the-/server.helpers
 * @function toControllerDriverFactory
 * @returns {function()}
 */
'use strict'

const isClass = require('is-class')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check')
const SessionAccess = require('./SessionAccess')
const assert = theAssert('@the-/server')

/** @lends module:@the-/server.helpers.toControllerDriverFactory */
function toControllerDriverFactory(ControllerFactory, options = {}) {
  const { controllerName, inject, sessionStore } = options
  unlessProduction(() => {
    assert(
      !!ControllerFactory,
      `[TheServer] Controller "${controllerName}" is missing`,
    )

    assert(
      !isClass(ControllerFactory),
      `class base ctrl is no longer available: "${controllerName}"`,
    )
  })

  function ControllerDriverFactory({ callbacks = {}, client = {} } = {}) {
    const { cid } = client

    const noop = () => null
    const interceptors = {
      controllerDidAttach: noop,
      controllerMethodDidInvoke: noop,
      controllerMethodWillInvoke: noop,
      controllerWillDetach: noop,
    }
    const {
      clear: clearSession,
      proxy: session,
      reload: reloadSession,
      save: saveSession,
    } = SessionAccess(sessionStore, cid)
    const controller = ControllerFactory({
      callbacks,
      session,
      ...inject(),
      intercept: (funcs = {}) => {
        for (const [name, func] of Object.entries(funcs)) {
          assert(name in interceptors, `Unknown interceptor name: ${name}`)
          interceptors[name] = func
        }
      },
    })
    const driver = {
      clearSession,
      controller,
      controllerName,
      interceptors,
      reloadSession,
      saveSession,
      async invoke(methodName, args) {
        return controller[methodName](...args)
      },
    }

    Object.freeze(driver)

    return driver
  }

  return ControllerDriverFactory
}

toControllerDriverFactory.all = (Controllers, options = {}) =>
  Object.assign(
    {},
    ...Object.entries(Controllers).map(([controllerName, Controller]) => ({
      [controllerName]: toControllerDriverFactory(Controller, {
        controllerName,
        ...options,
      }),
    })),
  )

module.exports = toControllerDriverFactory
