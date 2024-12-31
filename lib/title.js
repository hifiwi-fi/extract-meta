import { innerText } from './innerText.js'
// Thank you https://github.com/sindresorhus/article-title

const matchers = [
  '.instapaper_title',
  'article h1',
  '.entry-content h1',
  '.markdown-body h1',
  '.entry-title',
  '.post-title',
  '.pageTitle',
  '.post_title',
  '.headline h1',
  '.headline',
  '.story h1',
  '.entry-header h1',
  '.news_title',
  '#page-post h1',
  '.postheader h1',
  '.postheader h2',
  '.type-post h1'
]

/**
 *
 * @param {string} string
 * @returns string
 */
const clean = string => string.replace(/\r?\n/g, '').replace(/\s+/g, ' ').trim().substring(0, 255)
const ghPrefix = 'GitHub - '

// const removeSegments = string => {
//   let documentTitle = string
//   documentTitle = (/^[^|\-/•—]+/.exec(documentTitle) || [])[0] || documentTitle
//   documentTitle = (((documentTitle || '').match(/:(?<documentTitle>.*)/) || []).groups || '').documentTitle || documentTitle
//   documentTitle = (documentTitle || '').trim()
//
//   return documentTitle
// }

/**
 * Finds the first element that matches any of the predefined selectors and returns its trimmed inner text.
 * @param {Document} document - The document object to search within.
 */
const findSelectorMatch = document => {
  for (const matcher of matchers) {
    const element = innerText(document.querySelector(matcher))?.trim()

    if (element && element.length > 0) {
      return element
    }
  }
}

/**
 * Extracts the title from the document using various strategies.
 * @param {Object} params - The parameters object.
 * @param {Document} params.document - The document object to extract the title from.
 * @returns {string} The extracted title, or null if no title is found.
 */
export function getTitle ({ document }) {
  const location = document.location
  let documentTitle = innerText(document.querySelector('title'))?.replace(/\r?\n/g, '')

  if (['twitter.com', 'x.com'].some(d => location?.hostname?.endsWith(d)) && location?.pathname?.includes('/status/')) {
    // Grab the tweet content prefix
    const tweetByTitle = documentTitle.split(': "')[0] ?? ''
    return clean(tweetByTitle)
  }

  if (location?.hostname?.endsWith('github.com')) {
    if (documentTitle.startsWith(ghPrefix)) documentTitle = documentTitle.replace(ghPrefix, '')
    const parts = documentTitle.split(':')
    // @ts-expect-error TODO: fix this
    return parts.length > 1 ? clean(parts[0]) : clean(documentTitle)
  }

  // @ts-expect-error TODO: fix this
  const ogTitle = document.querySelector("meta[property='og:title']")?.content
  if (ogTitle && ogTitle.length > 5 && ogTitle.length < 100) {
    return clean(ogTitle)
  }

  // @ts-expect-error TODO: fix this
  const twitterTitle = document.querySelector("meta[name='twitter:title']")?.content
  if (twitterTitle && twitterTitle.length > 5 && twitterTitle.length < 100) {
    return clean(twitterTitle)
  }

  // TODO: mf1 and 2?

  const heading = findSelectorMatch(document)
  if (heading && heading.length > 5 && heading.length < 100) {
    return clean(heading)
  }

  return clean(documentTitle)
}
