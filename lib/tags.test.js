import path from 'path'
import fsp from 'fs/promises'
import tap from 'tap'
import desm from 'desm'
import { JSDOM } from 'jsdom'

import { getTitle } from './title.js'
import { getSummary } from './summary.js'
import { getTags } from './tags.js'

const __dirname = desm(import.meta.url)

function testHtml (file, url, result, option = 'test') {
  tap[option](`testing ${file} tag extraction`, async (t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
    const { document } = (new JSDOM(html, { url })).window
    const title = getTitle({ document })
    const summary = getSummary({ document, title })
    const tags = getTags({ document, title, summary })
    t.same(tags, result)
  })
}

testHtml('html5rocks', 'https://example.com', ['javascript', 'video'])
testHtml('shapeshed', 'https://example.com', ['javascript'])
testHtml('rhumaric', 'https://example.com', [])
testHtml('parkji', 'https://example.com', [])
testHtml('codelittle', 'https://example.com', ['python'])
testHtml('anthonyestebe', 'https://example.com', ['javascript'])
testHtml('agtlucas', 'https://example.com', [])
testHtml('tylerhenkel', 'https://example.com', [])
testHtml('numediaweb', 'https://example.com', ['javascript'])
testHtml('github-repo', 'https://github.com/sindresorhus/urls-md', ['repo', 'gh:sindresorhus'])
testHtml('yahoo', 'https://example.com', [])
testHtml('youtube-wiki', 'https://example.com', ['video'])
testHtml('github', 'https://github.com/bcomnes/siteup', ['javascript', 'repo', 'gh:bcomnes'])
testHtml('twitter', 'https://mobile.twitter.com/breadcrum_/status/1627153599057866753', ['book', 'tweet', 'twtr:breadcrum_'])
