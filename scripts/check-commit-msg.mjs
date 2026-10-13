#!/usr/bin/env node

import { readFileSync } from 'fs'

const APPS = ['backend', 'frontend']
const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'chore',
  'build',
  'ci',
  'revert',
]

const msgFile = process.argv[2]
if (!msgFile) {
  console.error('Usage: check-commit-msg.mjs <commit-msg-file>')
  process.exit(1)
}

const msg = readFileSync(msgFile, 'utf8').trim()

const types = TYPES.join('|')
const apps = APPS.join('|')

const pattern = new RegExp(`^(${types})(\\((${apps})\\))?!?:`)

if (!pattern.test(msg)) {
  console.error(`
✖  Invalid commit message prefix.

   Format : <type>[(<app>)][!]: <description>
   Types  : ${TYPES.join(', ')}
   Apps   : ${APPS.join(', ')}

   Examples:
     feat: add user authentication
     fix(backend): resolve connection timeout
     feat(frontend)!: drop IE11 support
`)
  process.exit(1)
}
