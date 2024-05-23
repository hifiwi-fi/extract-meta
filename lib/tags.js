import { getMetaDescription } from './summary.js'
import { getContent } from './get-content.js'

export function getTags ({ document, title, summary }) {
  const location = document.location
  const tags = new Set()

  const content = [
    normalize(title),
    normalize(summary)
  ]

  const metaDescription = getMetaDescription(document)
  if (metaDescription) content.push(normalize(metaDescription))

  const metaKeywords = getContent(document.querySelector('meta[name="keywords"],meta[itemprop="keywords"]'))
  if (metaKeywords) content.push(normalize(metaKeywords))

  const contetnString = content.join(' ')

  for (const [keyword, tag] of Object.entries(tagKeywords)) {
    if (contetnString.includes(keyword)) tags.add(tag)
  }

  if (location?.hostname?.endsWith('github.com')) {
    if (document.querySelector('.h-card')) {
      tags.add('person')
      const nickname = document.querySelector('.p-nickname').innerText
      if (nickname)tags.add(`gh:${nickname}`)
    }

    const pathParts = location?.pathname?.split('/')

    if (pathParts.length >= 3) {
      tags.add('repo')
      tags.add(`gh:${pathParts[1]}`)
    }
  }

  if (['twitter.com', 'x.com'].some(d => location?.hostname?.endsWith(d))) {
    const pathParts = location?.pathname?.split('/')
    if (location?.pathname?.includes('/status/')) {
      tags.add('tweet')
    }

    if (pathParts.length >= 2) {
      const username = pathParts[1]
      tags.add(`twtr:${username}`)
    }
  }

  for (const [regText, tag] of Object.entries(urlTags)) {
    const reg = regText instanceof RegExp ? regText : new RegExp('\\b' + regText + '\\b', 'i')
    if (reg.test(document?.location?.href)) {
      tags.add(tag)
    }
  }

  return Array.from(tags)
}

function normalize (string) {
  return string.toLowerCase()
}

const tagKeywords = {
  javascript: 'javascript',
  js: 'javascript',
  clojure: 'clojure',
  clj: 'clojure',
  clojurescript: 'clojurescript',
  cljs: 'clojurescript',
  python: 'python',
  ios: 'ios',
  video: 'video',
  books: 'book',
  book: 'book'
}

const urlTags = {
  'medium.com/([^/]+)$': 'blog',
  'medium.com/([^/]+)/.*': 'blog-posting',
  'stackoverflow.com/questions/\\d+/[^/]+/\\d+': 'answer',
  'stackoverflow.com/questions/\\d+/[^/]+/?$': 'question',
  'nytimes.com': 'article',
  'washingtonpost.com': 'article',
  'youtube.com/watch': 'video',
  'vimeo.com/\\d+': 'video',
  'imdb.com/title': 'movie',
  'imdb.com/name': 'person',
  'news.ycombinator.com/item': 'comment',
  'reddit.com': 'comment',
  'blog\.': 'blog', // eslint-disable-line no-useless-escape
  'schema.org/\\S+': 'type',
  'goodreads.com/book/show/': 'book'
}
