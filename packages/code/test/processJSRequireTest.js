'use strict'

/**
 * @file Test for processJSRequire.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const path = require('path')
const processJSRequire = require('../lib/processors/processJSRequire')

describe('process-require', async () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSRequire(`
const x = require('x')
const a = require('a')
const {jj} = require('j/jj')
      `),
      `
const a = require('a')
const {jj} = require('j/jj')
const x = require('x')
      `,
    )
  })

  it('Move none declare', async () => {
    equal(
      await processJSRequire(`#!/bin/bash node
/** abc */
'use strict'

const x = require('x')

function hoge(){

}

const x0 = x[0]
const a = require('a')
`),
      `#!/bin/bash node
/** abc */
'use strict'

const a = require('a')
const x = require('x')
function hoge(){

}

const x0 = x[0]
`,
    )
  })

  it('With default', async () => {
    equal(
      await processJSRequire(`
const z = require('z')
const pkg = require('./package.json')
const theSeat = require('b-seat').default
const a = require('a')
`),
      `
const a = require('a')
const theSeat = require('b-seat').default
const z = require('z')
const pkg = require('./package.json')
`,
    )
  })

  it('Normalize path', async () => {
    equal(
      await processJSRequire("const x = require('../b/x')", {
        filename: '/a/b/c.js',
      }),
      "const x = require('./x')",
    )
  })

  it('Remove ext path', async () => {
    equal(
      await processJSRequire("const x = require('../b/x.js')", {
        filename: '/a/b/c.js',
      }),
      "const x = require('./x')",
    )
  })

  it('Swap with comment line', async () => {
    equal(
      await processJSRequire(`
const x = require('x')
const a = require('a') // This is a
// This is b
const b = require('b')
`),
      `
const a = require('a') // This is a
const b = require('b')
// This is b
const x = require('x')
`,
    )
  })

  it('Upgrade assert', async () => {
    equal(
      await processJSRequire(`
const { equal } = require('assert').strict
const { deepEqual } = require('assert')
const { strictEqual, throws } = require('assert')
        `),
      `
const { equal } = require('assert').strict
const { deepEqual } = require('assert').strict
const { strictEqual, throws } = require('assert')
        `,
    )
  })

  it('With chdir', async () => {
    equal(
      await processJSRequire(`
const BASE_DIR = \`\${__dirname}/../..\`
process.chdir(BASE_DIR)
const path = require('path')
const { spawn } = require('child_process')
const PackageFiles = require('../packaging/PackageFiles')
`),
      `
const BASE_DIR = \`\${__dirname}/../..\`
process.chdir(BASE_DIR)
const { spawn } = require('child_process')
const path = require('path')
const PackageFiles = require('../packaging/PackageFiles')
`,
    )
  })

  it('With deep strict', async () => {
    equal(
      await processJSRequire("const {deepStrictEqual} = require('assert')"),
      "const {deepStrictEqual} = require('assert')",
    )
  })

  it('Append json', async () => {
    const pkgJsonPath = path.relative(
      __dirname,
      require.resolve('../package.json'),
    )
    equal(
      await processJSRequire(
        `const pkg = require('${pkgJsonPath.replace(/\.json$/, '')}')`,
        { filename: __filename },
      ),
      "const pkg = require('../package.json')",
    )
  })

  it('sort and keep order', async () => {
    equal(
      await processJSRequire(`
const a = require('a')
const c = new C()
update({ c })
const d = require('d')
`),
      `
const a = require('a')
const d = require('d')
const c = new C()
update({ c })
`,
    )
  })
})

/* global describe, before, after, it */
