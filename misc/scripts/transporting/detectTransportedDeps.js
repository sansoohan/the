#!/usr/bin/env node

'use strict'

const pkg = require('../../../package')
const path = require('path')
const aglob = require('aglob')
const baseDir = `${__dirname}/../../..`
process.chdir(baseDir)

const transporting = require('./transporting')


;(async () => {

  for (const pkgPath of await aglob(path.resolve(baseDir, 'packages/*/package.json'))) {
    const pkgDir = path.dirname(pkgPath)
    const pkg = require(pkgPath)
    for (const [name, version] of Object.entries(pkg.dependencies || {})) {
      if (name in transporting) {
        console.log(`Detect transported pkg ${name} in ${path.relative('.', pkgDir)}`)
      }
    }
    for (const [name, version] of Object.entries(pkg.devDependencies || {})) {
      if (name in transporting) {
        console.log(`Detect transported pkg ${name} in ${path.relative('.', pkgDir)}`)
      }
    }
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
