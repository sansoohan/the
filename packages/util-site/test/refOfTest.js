/**
 * Test for refOf.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const refOf = require('../lib/refOf')

describe('ref-of', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(refOf({ $$as: 'User', id: 3 }), 'User#3')
  })
})

/* global describe, before, after, it */
