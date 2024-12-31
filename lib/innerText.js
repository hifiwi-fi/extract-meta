/**
 * @param {HTMLElement | Element | null} [node] - The DOM node to extract content from.
 * @returns {string} The content or value attribute of the node.
 */
export const innerText = node =>
  // @ts-expect-error TS Isn't happy with the optional lookup
  node?.innerText ??
  node?.textContent ??
  '' // JSDOM doesn't support innerText
