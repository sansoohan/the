/**
 * Create "callRule" lint
 * @function callRule
 * @param {Object} config - Lint config
 * @param {Object} keypathArguments
 * @returns {function} Lint function
 */
'use strict'

const { has } = require('json-pointer')
const path = require('path')
const { parse, walk } = require('@the-/ast')

/** @lends callRule */
function callRule(config) {
  const { keypathArguments = {}, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[callRule] Unknown options`, Object.keys(rest))
  }
  return async function callRuleCheck({ content, filename, report }) {
    const parsed = parse(String(content), {
      sourceType: 'unambiguous',
    })
    const CallExpressions = []
    walk.simple(parsed.program, {
      CallExpression: (node) => CallExpressions.push(node),
    })

    for (const [name, target] of Object.entries(keypathArguments)) {
      const targetModule = require(path.resolve(target))
      const expressions = CallExpressions.filter(
        ({ callee }) => callee.name === name,
      )
      for (const expression of expressions) {
        const stringArgs = expression['arguments'].filter(
          ({ type }) => type === 'StringLiteral',
        )
        for (const arg of stringArgs) {
          let value = arg.value
          const key = ('/' + value.replace(/\./g, '/')).replace(/^\/+/, '/')
          const ok = has(targetModule, key) || value in targetModule
          let { column, line } = expression.loc.start
          !ok &&
            report('Keypath not found', {
              actual: true,
              code: String(content).substring(expression.start, expression.end),
              expect: false,
              given: value,
              loc: { column, line },
              where: path.resolve(filename),
            })
        }
      }
    }
  }
}

module.exports = callRule