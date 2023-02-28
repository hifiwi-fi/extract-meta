import { getTitle } from './lib/title.js'
import { getSummary } from './lib/summary.js'
import { getTags } from './lib/tags.js'

export async function extractMeta (document) {
  const title = getTitle({ document })
  const summary = getSummary({ document, title })
  const tags = getTags({ document, title, summary })

  return { title, summary, tags }
}
