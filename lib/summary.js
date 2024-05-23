import { innerText } from './innerText.js'
import { getContent } from './get-content.js'

const clean = string => string?.replace(/\s+/g, ' ').trim() || ''

export function getSummary ({ document, title }) {
  const location = document.location
  const selection = String(document?.getSelection())
  if (selection && selection.length > 1) return clean(selection)

  if (location?.hostname?.endsWith('twitter.com') && location?.pathname?.includes('/status/')) {
    // Grab the tweet content prefix
    const documentTitle = innerText(document.querySelector('title'))?.replace(/\r?\n/g, '')
    const tweetContent = documentTitle.split(': "')[1].split('" / Twitter')[0]
    return tweetContent
  }

  if (location?.hostname?.endsWith('x.com') && location?.pathname?.includes('/status/')) {
    const documentTitle = innerText(document.querySelector('title'))?.replace(/\r?\n/g, '')
    const tweetContent = documentTitle.split(': "')[1].split('" / X')[0]
    return tweetContent
  }

  const summary = getMetaDescription(document)
  if (summary) return clean(removeTitle({ summary, title }))

  return clean(removeTitle({ summary: getFirstParagraph(document), title }))
}

function removeTitle ({ title, summary }) {
  return summary?.replace(title, '') || summary
}

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

function getFirstParagraph (document) {
  const firstParagraphh = innerText(document.querySelector('article p'))

  return firstParagraphh?.replace(/\r?\n/g, '')?.replace(/\s+/g, ' ')?.trim()
}
