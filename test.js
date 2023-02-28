import tap from 'tap'
import fsp from 'fs/promises'
import path from 'path'
import desm from 'desm'
import { JSDOM } from 'jsdom'

import { extractMeta } from './index.js'
const __dirname = desm(import.meta.url)

tap.test('external api exposes all extracted fields', async (t) => {
  const html = await fsp.readFile(path.join(__dirname, 'lib', 'fixtures', 'html5rocks.html'), 'utf8')
  const { document } = (new JSDOM(html, { url: 'https://html5rocks.com' })).window
  const { title, summary, tags } = extractMeta(document)

  t.ok(title, 'the title is extracted')
  t.ok(summary, 'the title is extracted')
  t.ok(tags.length > 0, 'the title is extracted')
})
