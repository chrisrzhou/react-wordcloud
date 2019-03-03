# ☁️ React Wordcloud

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

![image](./wordcloud.png)

## Install

```bash
yarn add https://github.com/chrisrzhou/react-wordcloud.git
```

## Examples

View all documented examples at https://chrisrzhou.github.io/wordcloud.

A simple example using only required props:

```js
import * as React from "react";
import ReactWordcloud from "react-wordcloud";

const words = [
  { text: "hello", count: 3 },
  { text: "world", count: 1 },
  { text: "github", count: 1 },
  { text: "code", count: 1 }
];

function MyApp() {
  return (
    <div style={{ width: 600, height: 400 }}>
      <ReactWordcloud words={words} />
    </div>
  );
}
```

You can also run the examples locally:

```bash
git clone git@github.com:chrisrzhou/react-wordcloud

cd react-wordcloud
yarn
yarn dev
```

## Development

`react-wordcloud` is built with the following main dependencies:

- `react`
- `d3`
- `d3-cloud`

The code is written in `typescript`, linted with `eslint` + `prettier`, and built with `rollup`. Examples and documentations are built with `docz`.

Feel free to contribute by submitting a pull request.

## Wordcloud Generator

Create wordclouds using this wordcloud generator: https://wordcloud.chrisrzhou.io.

Features supported:

- Editing and uploading text inputs
- Various NLP methods (stopwords, ngrams)
- Wordcloud configurations
- Export/save/share wordclouds
