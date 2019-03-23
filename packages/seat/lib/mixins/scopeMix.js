'use strict'

const { escape } = require('json-pointer')

function scopeMix(Class) {
  return class ScopeMixed extends Class {
    scopePathFor(...names) {
      const { scopeName } = this
      const prefix = scopeName ? `/@${escape(scopeName)}` : ''
      return [prefix, ...names.map(escape)].join('/')
    }

    subScopeNameOf(scopeName) {
      return [this.scopeName, scopeName].filter(Boolean).join('/')
    }
  }
}

module.exports = scopeMix