'use strict'

/**
 * Test for colorWithAlpha.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const colorWithAlpha = require('../lib/colorWithAlpha')

describe('color-with-alpha', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(
      colorWithAlpha('rgba(255,255,255,0.4)', 0.5),
      'rgba(255, 255, 255, 0.5)',
    )
  })
})

/* global describe, before, after, it */
