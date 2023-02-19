import path from 'path'
import fsp from 'fs/promises'
import cheerio from 'cheerio'
import tap from 'tap'
import desm from 'desm'

import { getTitle } from './title.js'

const __dirname = desm(import.meta.url)

function testHtml (file, result, option = 'test') {
  tap[option](`testing ${file} title extraction`, async (t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
    const $ = cheerio.load(html)
    t.is(getTitle($), result)
  })
}

testHtml('html5rocks', 'Yo Polymer – A Whirlwind Tour Of Web Component Tooling')
testHtml('shapeshed', 'Using the European npm mirror')
testHtml('rhumaric', 'Building a Yeoman generator')
testHtml('parkji', 'Using Yeoman to scaffold out new websites')
testHtml('codelittle', 'How To Use Yeoman')
testHtml('anthonyestebe', 'What Is Yeoman')
testHtml('agtlucas', 'Why you should use Yeoman')
testHtml('tylerhenkel', 'Angular Fullstack 1.2.0 available now')
testHtml('numediaweb', 'Web App with dream team; AngularJS, Cordova, Yeoman & Topcoat')
testHtml('github-repo', 'urls-md')
testHtml('yahoo', 'Yahoo')
testHtml('youtube-wiki', 'Wikipedia: #Edit2014', 'skip')
