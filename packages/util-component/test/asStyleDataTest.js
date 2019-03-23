/**
 * Test for asStyleData.
 * Runs with mocha.
 */
'use strict'

const { deepEqual, ok } = require('assert')
const asStyleData = require('../lib/asStyleData')

describe('as-style-data', () => {
  before(() => {})

  after(() => {})

  it('As style data', () => {
    const data = asStyleData('.foo', {
      '.foo-inner': {
        '.bar': {
          text: 'green',
        },
        display: 'block',
      },
      '.foo-inner,.bar-inner': {
        background: 'green',
      },
      '&:hover,&:active': {
        opacity: 0.5,
      },
    })
    ok(data)
    deepEqual(data, {
      '.foo .bar-inner': { background: 'green' },
      '.foo .foo-inner': { background: 'green', display: 'block' },
      '.foo .foo-inner .bar': { text: 'green' },
      '.foo:active': { opacity: 0.5 },
      '.foo:hover': { opacity: 0.5 },
    })
  })

  it('More complex data', () => {
    let data = asStyleData('.the-button-group', {
      '&': {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '8px 0',
      },
      '&.the-button-group-collapsed': {
        '.the-button': {
          '&:first-child': {
            borderLeft: 'none',
            margin: '0',
          },
          '&:last-child': {
            borderRight: 'none',
          },
          borderBottom: 'none',
          borderRadius: 0,
          margin: '0 -1px 0 0',
        },
        flexWrap: 'nowrap',
      },
    })
    deepEqual(data, {
      '.the-button-group': {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '8px 0',
      },
      '.the-button-group.the-button-group-collapsed': { flexWrap: 'nowrap' },
      '.the-button-group.the-button-group-collapsed .the-button': {
        borderBottom: 'none',
        borderRadius: 0,
        margin: '0 -1px 0 0',
      },
      '.the-button-group.the-button-group-collapsed .the-button:first-child': {
        borderLeft: 'none',
        margin: '0',
      },
      '.the-button-group.the-button-group-collapsed .the-button:last-child': {
        borderRight: 'none',
      },
    })
  })
})

/* global describe, before, after, it */