import { getTitle } from './lib/title.js'
import { getSummary } from './lib/summary.js'
import { getTags } from './lib/tags.js'

/**
 * @typedef {{
 *  title: string,
 *  summary: string,
 *  tags: string[]
 * }} ExtractMetaMeta
 */

/**
 * Extract lightweight common metadata from many DOM documents.
 *
 * @param {Document} document a DOM document object or JSDOM
 * @returns {ExtractMetaMeta}
 */
export function extractMeta (document) {
  const title = getTitle({ document })
  const summary = getSummary({ document, title })
  const tags = getTags({ document, title, summary })

  return { title, summary, tags }
}
