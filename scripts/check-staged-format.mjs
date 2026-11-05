#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import * as prettier from 'prettier'

// Check the index snapshot, including partially staged files, without rewriting it.
const files = execFileSync(
  'git',
  ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '--no-renames', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean)

const failures = []
let checked = 0

for (const file of files) {
  const info = await prettier.getFileInfo(file, { ignorePath: '.prettierignore' })
  if (info.ignored || !info.inferredParser) continue

  const content = execFileSync('git', ['show', ':' + file], {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  })
  const config = await prettier.resolveConfig(file, { editorconfig: true })
  checked++
  try {
    if (!(await prettier.check(content, { ...config, filepath: file }))) failures.push(file)
  } catch {
    failures.push(file)
  }
}

if (failures.length) {
  console.error('Formatting failed for staged files:')
  for (const file of failures) console.error('  ' + file)
  console.error('Format those files with pnpm exec prettier --write, then git add them again.')
  process.exitCode = 1
} else {
  console.log('Staged formatting passed (' + checked + ' supported files checked).')
}
