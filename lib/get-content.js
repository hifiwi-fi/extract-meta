/**
 * @param {HTMLElement | Element | null} [node] - The DOM node to extract content from.
 * @returns { string | null | undefined } The content or value attribute of the node.
 */
export const getContent = node => node?.getAttribute('content') || node?.getAttribute('value')
