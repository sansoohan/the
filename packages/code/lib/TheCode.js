const aglob = require('aglob')
const { canWriteAsync, readFileAsync, statAsync } = require('asfs')
const path = require('path')
const minimatch = require('minimatch')
const writeout = require('writeout')
const Types = require('./constants/Types')
const { typeHelper, ignoreFilter, readRCFile } = require('./helpers')
const FormatCache = require('./helpers/FormatCache')
const p = require('./processors')
const pkg = require('../package')
const debug = require('debug')('the:code')
const { findup } = require('@the-/util-path')

const MB = 1000 * 1000

/**
 * @memberof module:@the-/code
 * @class TheCode
 * @param {Object} [config={}] - Code config
 */
class TheCode {
  constructor (config = {}) {
    const {
      ignoreFile = findup.sync('.thecodeignore'),
      rcFile = findup.sync('.thecoderc.yml'),
      cacheFile = `node_modules/.cache/the-code/cache.json`,
      cssProp = true,
      cssRule = true,
      fileEnd = true,
      jsBinaryExpression = true,
      jsBlock = true,
      jsRedundant = true,
      jsClass = true,
      jsComment = true,
      jsDoc = true,
      jsFunction = true,
      jsImport = true,
      jsObject = true,
      jsArray = true,
      json = true,
      jsChaining = true,
      jsPrettier = true,
      jsRequire = true,
      jsStrict = true,
      jsIf = true,
      jsString = true,
      jsSwitch = true,
      jsUnused = true,
      jsDeclaration = true,
      jsxAttribute = true,
      jsxExpression = true,
      yaml = true,
      maxFileSize = 1.5 * MB,
    } = config
    this.processers = {
      [Types.JAVA_SCRIPT]: [
        jsBlock && p.processJSBlock,
        jsComment && p.processJSComment,
        jsClass && p.processJSClass,
        jsChaining && p.processJSChaining,
        jsDoc && p.processJSDoc,
        fileEnd && p.processFileEnd,
        jsFunction && p.processJSFunction,
        jsImport && p.processJSImport,
        jsRedundant && p.processJSRedundant,
        jsObject && p.processJSObject,
        jsArray && p.processJSArray,
        jsIf && p.processJSIf,
        jsRequire && p.processJSRequire,
        jsStrict && p.processJSStrict,
        jsSwitch && p.processJSSwitch,
        jsBinaryExpression && p.processJSBinaryExpression,
        jsString && p.processJSString,
        jsxAttribute && p.processJSXAttribute,
        jsxExpression && p.processJSXExpression,
        jsDeclaration && p.processJSDeclaration,
        jsUnused && p.processJSUnused,
        jsPrettier && p.processJSPrettier,
      ].filter(Boolean),
      [Types.JSON]: [json && p.processJSON, fileEnd && p.processFileEnd].filter(
        Boolean,
      ),
      [Types.JSON_PACKAGE_JSON]: [
        p.processPackageJSON,
        fileEnd && p.processFileEnd,
      ].filter(Boolean),
      [Types.JSON_PACKAGE_LOCK_JSON]: [p.processPackageLockJSON].filter(
        Boolean,
      ),
      [Types.STYLE_SHEET]: [
        cssRule && p.processCSSRule,
        cssProp && p.processCSSProp,
        fileEnd && p.processFileEnd,
      ].filter(Boolean),
      [Types.TEXT]: [fileEnd && p.processFileEnd].filter(Boolean),
      [Types.YAML]: [yaml && p.processYAML].filter(Boolean),
    }
    this.cache = new FormatCache(cacheFile, {
      version: pkg.version,
    })
    this.maxFileSize = maxFileSize
    this.ignoreFile = ignoreFile
    this.rcFile = rcFile
  }

  shouldSkipContent (content) {
    return [
      // Using golang format
      // https://github.com/golang/go/issues/13560
      /\/\/ Code generated by .* DO NOT EDIT/i,
      /<!-- Code generated by .* DO NOT EDIT -->/i,
      /# Code generated by .* DO NOT EDIT/i,
      // TODO support the-code-enable like  https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
      /\* the-code-disable \*/i,
    ].some((pattern) => pattern.test(content))
  }

  async clearCache () {
    await this.cache.clear()
  }

  /**
   * Format files
   * @param {string} pattern  - file name
   * @param {Object} [options={}] - Optional
   * @returns {Promise<Array>}
   */
  async format (pattern, options = {}) {
    const { ignore, force, concurrency = 25 } = options
    const filenames = (await aglob(pattern, { ignore })).filter(
      ignoreFilter(this.ignoreFile),
    )
    const rc = await readRCFile(this.rcFile)
    const allResults = []
    for (let i = 0; i < filenames.length; i += concurrency) {
      const filenamesToFormat = filenames.slice(i, i + concurrency)
      const results = await Promise.all(
        filenamesToFormat.map((filename) =>
          this.formatFile(filename, { rc, force }),
        ),
      )
      allResults.push(...results.filter(Boolean))
    }
    return allResults
  }

  /**
   * Format a single file
   * @param {string} filename
   * @param {Object} [options={}] - Optional setting
   * @returns {Promise<undefined>}
   */
  async formatFile (filename, options = {}) {
    const { force, rc = {} } = options
    const shouldSkipFile = await this.shouldSkipFile(filename)
    if (!force && shouldSkipFile) {
      debug('Skip', filename)
      return Promise.resolve({ filename, skipped: true })
    }

    const { cache } = this
    const input = String(await readFileAsync(filename))
    const shouldSkipContent = this.shouldSkipContent(input)
    if (!force && shouldSkipContent) {
      debug('Skip', filename)
      return Promise.resolve({ filename, skipped: true })
    }

    const type = typeHelper.typeOf(filename)
    const sourceType = typeHelper.sourceTypeOf(filename)
    const processers = this.processers[type]
    const ruleEntry = Object.entries(rc.rules || {})
      .find(([k]) => minimatch(filename, k))
    const formatted = await processers.reduce(
      (input, process) =>
        Promise.resolve(input)
          .then((input) =>
            process(String(input), {
              filename: path.resolve(filename),
              sourceType,
              rule: ruleEntry ? ruleEntry[1] : {},
            }),
          )
          .catch((err) => {
            err.message = `[${process.name || 'unknown'}]<${filename}> ${
              err.message
            }`
            throw err
          }),
      input,
    )
    const result = await writeout(filename, String(formatted), {
      skipIfIdentical: true,
    }).catch(() => null)
    if (result) {
      debug('File formatted', filename)
    }

    await cache.set(filename, { at: new Date().getTime() })
    return result
  }

  async shouldSkipFile (filename) {
    const stat = await statAsync(filename).catch(() => null)
    if (!stat) {
      return false
    }

    const tooLarge = stat.size > this.maxFileSize
    if (tooLarge) {
      const relativeName = path.relative(process.cwd(), filename)
      console.warn(
        `[TheCode] Skipp to large file: ${relativeName} ( ${(
          stat.size / MB
        ).toFixed(2)}MB )`,
      )
      return false
    }

    const canWrite = await canWriteAsync(filename)
    if (!canWrite) {
      return true
    }

    const cached = await this.cache.get(filename)
    if (!cached) {
      return false
    }

    return new Date(cached.at) >= new Date(stat.mtime)
  }
}

module.exports = TheCode
