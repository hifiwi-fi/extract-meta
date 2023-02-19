import cheerio from 'cheerio'
import { getTitle } from './lib/title.js'

export async function extractMeta (html) {
  const $ = cheerio.load(html)

  const title = getTitle($)

  return { title }
}
