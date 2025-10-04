# @breadcrum/extract-meta
[![Actions Status](https://github.com/hifiwi-fi/extract-meta/workflows/tests/badge.svg)](https://github.com/hifiwi-fi/extract-meta/actions)
[![latest version](https://img.shields.io/npm/v/@breadcrum/extract-meta.svg)](https://img.shields.io/npm/v/@breadcrum/extract-meta.svg)
[![downloads](https://img.shields.io/npm/dm/@breadcrum/extract-meta.svg)](https://npmtrends.com/@breadcrum/extract-meta)

A generalized metadata extractor for [breadcrum.net](https://breadcrum.net). Not perfect, but a start. Nothing in this is very set in stone. Ideas welcome.

## API

```js
import { extractMeta } from '@breadcrum/extract-meta'
const { title, summary, tags } = await extractMeta(document)
// String title
// String summary
// Array of tag strings
````

## See also

- [sindresorhus/article-title](https://github.com/sindresorhus/article-title): used as the starting point for this module.
- [resonance-cascade/particular-pinboard](https://github.com/resonance-cascade/particular-pinboard): Refactored to work with jsdom and integrated many ideas from many forks.
