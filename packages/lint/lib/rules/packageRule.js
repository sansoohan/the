/**
 * Create "packageRule" lint
 * @memberof module:@the-/lint.rules
 * @function packageRule
 * @param {Object} config - Lint config
 * @returns {function()} Lint function
 */
'use strict'

const aglob = require('aglob')
const { readFileAsync } = require('asfs')
const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')

/** @lends module:@the-/lint.rules.packageRule */
function packageRule(config) {
  const {
    depsUsedIn = '**/*.js',
    devDepsUsedIn = '**/*.js',
    except = [],
    ignore = '**/node_modules/**',
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[packageRule] Unknown options`, Object.keys(rest))
  }
  const _json = ({ content, filename }) => {
    try {
      return JSON.parse(content)
    } catch (e) {
      throw new Error(`[@the-/lint] Failed to parse as json: ${filename}`)
    }
  }
  return async function packageRuleCheck({ content, filename, report }) {
    const pkg = _json({ content, filename })
    const doCheck = async (deps, usedIn, { as }) => {
      if (!deps) {
        return
      }
      const depsNames = Object.keys(deps)
      const unusedNames = new Set(
        depsNames.filter((name) => !except.includes(name)),
      )
      for (const filename of await aglob(usedIn, { ignore })) {
        const content = String(await readFileAsync(filename))
        const parsed = parse(content)
        const stringLiterals = finder.findByTypes(parsed, [
          NodeTypes.StringLiteral,
        ])
        for (const name of unusedNames) {
          const used = stringLiterals.some((str) => str.value === name)
          if (used) {
            unusedNames.delete(name)
          }
        }
      }
      const ok = unusedNames.length === 0
      !ok &&
        report('dependencies is not used', {
          actual: false,
          as,
          deps: [...unusedNames.values()],
          expect: true,
          where: path.resolve(filename),
        })
    }
    await doCheck(pkg.dependencies, depsUsedIn, { as: 'dependencies' })
    await doCheck(pkg.devDependencies, devDepsUsedIn, { as: 'devDependencies' })
  }
}

module.exports = packageRule