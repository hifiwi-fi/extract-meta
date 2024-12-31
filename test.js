import test from 'node:test'
import assert from 'node:assert/strict'
import fsp from 'fs/promises'
import path from 'path'
import desm from 'desm'
import { JSDOM } from 'jsdom'

import { extractMeta } from './index.js'
const __dirname = desm(import.meta.url)

test('external api exposes all extracted fields', async (_t) => {
  const html = await fsp.readFile(path.join(__dirname, 'lib', 'fixtures', 'html5rocks.html'), 'utf8')
  const { document } = (new JSDOM(html, { url: 'https://html5rocks.com' })).window
  const { title, summary, tags } = extractMeta(document)

  assert.ok(title, 'the title is extracted')
  assert.ok(summary, 'the summary is extracted')
  assert.ok(tags.length > 0, 'the tags are extracted')
})
