import path from 'path'
import fsp from 'fs/promises'
import tap from 'tap'
import desm from 'desm'
import { JSDOM } from 'jsdom'

import { getTitle } from './title.js'

const __dirname = desm(import.meta.url)

function testHtml (file, url, result, option = 'test') {
  tap[option](`testing ${file} title extraction`, async (t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
    const { document } = (new JSDOM(html, { url })).window
    t.equal(getTitle({ document }), result)
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
testHtml('numediaweb', 'https://example.com', 'Web App with dream team; AngularJS, Cordova, Yeoman & Topcoat')
testHtml('github-repo', 'https://github.com/sindresorhus/urls-md', 'sindresorhus/urls-md')
testHtml('yahoo', 'https://example.com', 'Yahoo')
testHtml('youtube-wiki', 'https://example.com', '#Edit2014')
testHtml('github', 'https://github.com/bcomnes/siteup', 'bcomnes/siteup')
testHtml('twitter', 'https://mobile.twitter.com/breadcrum_/status/1627153599057866753', '🥖 Breadcrum on Twitter')
testHtml('youtube-2', 'https://www.youtube.com/watch?v=UoNAmRwf5qk', 'Kids are very dumb.')
