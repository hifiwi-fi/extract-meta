import path from 'path'
import fsp from 'fs/promises'
import desm from 'desm'
import { JSDOM } from 'jsdom'
import test from 'node:test'
import assert from 'node:assert/strict'

import { getTitle } from './title.js'

const __dirname = desm(import.meta.url)

/**
 * Tests the summary extraction from an HTML file.
 * @param {string} file - The name of the HTML file to test.
 * @param {string} url - The URL to use for the document.
 * @param {string} result - The expected summary result.
 * @param {string} [option='test'] - The test option ('test', 'skip', 'todo', 'only').
 */
function testHtml (file, url, result, option = 'test') {
  const testOptions = {
    skip: option === 'skip',
    todo: option === 'todo',
    only: option === 'only'
  }

  test(`testing ${file} title extraction`, testOptions, async (_t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
    const { document } = (new JSDOM(html, { url })).window
    assert.strictEqual(getTitle({ document }), result)
  })
}

testHtml('html5rocks', 'https://example.com', 'Yo Polymer – A Whirlwind Tour Of Web Component Tooling')
testHtml('shapeshed', 'https://example.com', 'Using the European npm mirror')
testHtml('rhumaric', 'https://example.com', 'Building a Yeoman generator')
testHtml('parkji', 'https://example.com', 'Using Yeoman to scaffold out new websites')
testHtml('codelittle', 'https://example.com', 'How To Use Yeoman')
testHtml('anthonyestebe', 'https://example.com', 'What is Yeoman')
testHtml('agtlucas', 'https://example.com', 'Why you should use Yeoman')
testHtml('tylerhenkel', 'https://example.com', 'Angular Fullstack 1.2.0 available now')
testHtml('numediaweb', 'https://example.com', 'Web App with dream team; AngularJS, Cordova, Yeoman & Topcoat - Numedia Web')
testHtml('github-repo', 'https://github.com/sindresorhus/urls-md', 'sindresorhus/urls-md')
testHtml('yahoo', 'https://example.com', 'Yahoo')
testHtml('youtube-wiki', 'https://example.com', 'Wikipedia: #Edit2014')
testHtml('github', 'https://github.com/bcomnes/siteup', 'bcomnes/siteup')
testHtml('twitter', 'https://mobile.twitter.com/breadcrum_/status/1627153599057866753', '🥖 Breadcrum on Twitter')
testHtml('youtube-2', 'https://www.youtube.com/watch?v=UoNAmRwf5qk', 'Kids are very dumb.')
testHtml('cable-lacing', 'https://www.thebroadcastbridge.com/content/entry/12400/the-lost-art-of-lacing-cable', 'The Lost Art of Lacing Cable - The Broadcast Bridge - Connecting IT to Broadcast')
