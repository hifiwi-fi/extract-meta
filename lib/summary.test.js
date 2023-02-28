import path from 'path'
import fsp from 'fs/promises'
import tap from 'tap'
import desm from 'desm'
import { JSDOM } from 'jsdom'

import { getTitle } from './title.js'
import { getSummary } from './summary.js'

const __dirname = desm(import.meta.url)

function testHtml (file, url, result, option = 'test') {
  tap[option](`testing ${file} summary extraction`, async (t) => {
    const html = await fsp.readFile(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')

    const { document } = (new JSDOM(html, { url })).window
    const title = getTitle({ document })
    const summary = getSummary({ document, title })
    t.equal(summary, result)
  })
}

testHtml('html5rocks', 'https://example.com', 'A resource for developers looking to put HTML5 to use today, including information on specific features and when to use them in your apps.')
testHtml('shapeshed', 'https://example.com', 'If you are located in Europe the European npm mirror is fast and reliable. With a few tweaks you can easily publish to the main registry too.')
testHtml('rhumaric', 'https://example.com', 'I\'m taking a quick break from the shiny land of CSS animations. Back to the black and white (or green and white, or whatever your console colors are) land of workflow automation, with a quick explanation of what it took to build my first generator for Yeoman: generator-playground.')
testHtml('parkji', 'https://example.com', 'Recently I\'ve been playing around with Yeoman, a web scaffolding tool. If you\'ve never heard of it before, or are unfamiliar with it, stop right now & go check it out!')
testHtml('codelittle', 'https://example.com', 'Designer Gone Programmer Documents What He Learns.')
testHtml('anthonyestebe', 'https://example.com', 'What Is Yeoman I just realized I’d never talked about some tools like Yo, Grunt or Bower so today I will fix this and I will talk about Yeoman …')
testHtml('agtlucas', 'https://example.com', 'A quick overview about Yeoman')
testHtml('tylerhenkel', 'https://example.com', 'Our much-anticipated 1.2.0 release of the Angular Fullstack generator is available now.')
testHtml('numediaweb', 'https://example.com', 'I spent some time goggling about the different workflows out there in the web applications development in general, and those ones that will be brought to native mobile apps (using the Cordova/Phonegap platform) afterwards. The first complexity was to keep up with all the scattered approaches over there; not only every tutorial claims to win the …')
testHtml('github-repo', 'https://github.com/sindresorhus/urls-md', 'urls-md - Convert URLs to Markdown links: Extracts URLs from text → Gets their article title → Creates Markdown links')
testHtml('yahoo', 'https://example.com', 'News, email and search are just the beginning. Discover more every day. Find your yodel.')
testHtml('youtube-wiki', 'https://example.com', 'The world made more than 100 million edits to Wikipedia in 2014. In our first ever annual video, revisit what you read and edited, from the FIFA World Cup to...')
testHtml('github', 'https://github.com/bcomnes/siteup', '☝️ siteup builds websites with html, md, css and javascript. - GitHub - : ☝️ siteup builds websites with html, md, css and javascript.')
testHtml('twitter', 'https://mobile.twitter.com/breadcrum_/status/1627153599057866753', 'The bookmarklet now optimistically creates bookmarks when opening. Now you can either edit and save, or just close the window and your bookmark will be waiting for you. https://t.co/gA46qAk4d0')
testHtml('youtube-2', 'https://www.youtube.com/watch?v=UoNAmRwf5qk', 'Shop G FUEL’s Flavor Buddiez!! https://gfuel.ly/pewds-flavor-buddiez-boxStock Up On ➡️🥤Gfuel (affiliate): https://gfuel.ly/pewdiepie-collection#Code #Pewdie...')
