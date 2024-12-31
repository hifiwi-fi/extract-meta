import path from 'path'
import fsp from 'fs/promises'
import { JSDOM } from 'jsdom'
import desm from 'desm'
import test from 'node:test'
import assert from 'node:assert/strict'

import { getTitle } from './title.js'
import { getSummary } from './summary.js'
import { getTags } from './tags.js'

const __dirname = desm(import.meta.url)

/**
 * Tests the summary extraction from an HTML file.
 * @param {string} file - The name of the HTML file to test.
 * @param {string} url - The URL to use for the document.
 * @param {string[]} result - The expected summary result.
 * @param {string} [option='test'] - The test option ('test', 'skip', 'todo', 'only').
 */
function testHtml (file, url, result, option = 'test') {
  const testOptions = {
    skip: option === 'skip',
    todo: option === 'todo',
    only: option === 'only'
  }

  test(`testing ${file} tag extraction`, testOptions, async (_t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
    const { document } = (new JSDOM(html, { url })).window
    const title = getTitle({ document })
    const summary = getSummary({ document, title })
    const tags = getTags({ document, title, summary })
    assert.deepStrictEqual(tags, result)
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
testHtml('youtube-2', 'https://www.youtube.com/watch?v=UoNAmRwf5qk', ['video'])
testHtml('cable-lacing', 'https://www.thebroadcastbridge.com/content/entry/12400/the-lost-art-of-lacing-cable', ['ios'])
