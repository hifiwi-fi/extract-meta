import tap from 'tap'
import fsp from 'fs/promises'
import path from 'path'
import desm from 'desm'

import { extractMeta } from './index.js'
const __dirname = desm(import.meta.url)

tap.test('external api exposes all extracted fields', async (t) => {
  const html = await fsp.readFile(path.join(__dirname, 'lib', 'fixtures', 'html5rocks.html'), 'utf8')

  const { title } = await extractMeta(html)

  t.ok(title, 'the title is extracted')
})
