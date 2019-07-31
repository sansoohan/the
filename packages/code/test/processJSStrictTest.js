'use strict'

/**
 * Test for processJSStrict.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processJSStrict = require('../lib/processors/processJSStrict')

describe('process-j-s-strict', () => {
  before(() => {})

  after(() => {})

  it('Skip', async () => {
    equal(
      await processJSStrict(`
  "use strict"
  
  const a = 'hoge'
      `),
      `
  "use strict"
  
  const a = 'hoge'
      `,
    )
  })

  it('Inject', async () => {
    equal(
      await processJSStrict('const a = 1'),
      await processJSStrict("'use strict'\nconst a = 1"),
    )
  })
})

/* global describe, before, after, it */
