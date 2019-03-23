/**
 * Test for isJSON5File.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const isJSON5File = require('../lib/isJSON5File')

describe('is-j-s-o-n5-file', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(isJSON5File('hoge.json5'))
    ok(!isJSON5File('hoge.json'))
  })
})

/* global describe, before, after, it */