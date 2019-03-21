/**
 * Generate jsdoc
 * @memberof module:@the-/script-doc
 * @function doc
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const aglob = require('aglob')
const argx = require('argx')
const jsdocToMarkdown = require('jsdoc-to-markdown')
const { EOL } = require('os')
const path = require('path')
const { uniqueFilter } = require('the-array')
const writeout = require('writeout')

/** @lends doc */
async function doc(dirname = process.cwd(), options = {}) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()
  const {
    jsonFile = 'doc/api/jsdoc.json',
    mdFile = 'doc/api/api.md',
    src = ['lib/*.js', 'lib/**/*.js', 'lib/*.jsx', 'lib/**/*.jsx'],
  } = options
  const cwd = process.cwd()
  process.chdir(dirname)

  const filenames = []
    .concat(src)
    .reduce(
      (resolved, src) => [
        ...resolved,
        ...aglob.sync(path.resolve(dirname, src)),
      ],
      [],
    )
    .filter(uniqueFilter())

  // Render data file
  {
    const data = await jsdocToMarkdown.getTemplateData({ files: filenames })
    await doc.write(jsonFile, JSON.stringify(data, null, 2) + EOL)
  }

  // Render md file
  {
    const rendered = await jsdocToMarkdown.render({
      files: filenames,
    })
    await doc.write(
      mdFile,
      `<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

${rendered}`,
    )
  }

  process.chdir(cwd)
}

doc.write = async (filename, content) => {
  const { skipped } = await writeout(filename, content, {
    force: true,
    mkdirp: true,
    skipIfIdentical: true,
  })
  if (!skipped) {
    console.log(`[script-jsdoc] File generated: ${filename}`)
  }
}

module.exports = doc
