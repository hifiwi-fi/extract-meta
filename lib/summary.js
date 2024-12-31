import { innerText } from './innerText.js'
import { getContent } from './get-content.js'

/**
 * Cleans up a string by replacing multiple spaces with a single space and trimming it.
 * @param {string} string - The string to clean.
 * @returns {string} The cleaned string.
 */
const clean = string => string?.replace(/\s+/g, ' ').trim() || ''

/**
 * Extracts a summary from the document based on the selection, meta description, or first paragraph.
 * @param {Object} params - The parameters object.
 * @param {Document} params.document - The document object to extract the summary from.
 * @param {string} params.title - The title of the document.
 * @returns { string } The extracted summary.
 */
export function getSummary ({ document, title }) {
  const location = document.location
  const selection = String(document?.getSelection())
  if (selection && selection.length > 1) return clean(selection)

  if (location?.hostname?.endsWith('twitter.com') && location?.pathname?.includes('/status/')) {
    // Grab the tweet content prefix
    const documentTitle = innerText(document.querySelector('title'))?.replace(/\r?\n/g, '')
    const tweetContent = documentTitle.split(': "')[1]?.split('" / Twitter')[0]
    return tweetContent ?? ''
  }

  if (location?.hostname?.endsWith('x.com') && location?.pathname?.includes('/status/')) {
    const documentTitle = innerText(document.querySelector('title'))?.replace(/\r?\n/g, '')
    const tweetContent = documentTitle.split(': "')[1]?.split('" / X')[0]
    return tweetContent ?? ''
  }

  const summary = getMetaDescription(document)
  if (summary) return clean(removeTitle({ summary, title }))

  return clean(removeTitle({ summary: getFirstParagraph(document), title }))
}

/**
 * Removes the title from the summary.
 * @param {Object} params - The parameters object.
 * @param {string} params.title - The title to remove.
 * @param {string} params.summary - The summary from which to remove the title.
 * @returns {string} The summary without the title.
 */
function removeTitle ({ title, summary }) {
  return summary?.replace(title, '') || summary
}

/**
 * Retrieves the meta description from the document.
 * @param {Document} document - The document object to extract the meta description from.
 * @returns {string} The cleaned meta description or null if not found.
 */
export function getMetaDescription (document) {
  const metaDescription = getContent(document.querySelector("meta[name='description'],meta[description]"))
  if (metaDescription) {
    return clean(metaDescription)
  }

  const ogDescription = getContent(document.querySelector("meta[property='og:description']"))
  if (ogDescription) {
    return clean(ogDescription)
  }

  const twitterDescription = getContent(document.querySelector("meta[name='twitter:description']"))
  if (twitterDescription) {
    return clean(twitterDescription)
  }
  return ''
}

/**
 * Retrieves the first paragraph text from the document.
 * @param {Document} document - The document object to extract the first paragraph from.
 * @returns {string} The text of the first paragraph or null if not found.
 */
function getFirstParagraph (document) {
  const firstParagraph = innerText(document.querySelector('article p'))

  return firstParagraph?.replace(/\r?\n/g, '')?.replace(/\s+/g, ' ')?.trim()
}
