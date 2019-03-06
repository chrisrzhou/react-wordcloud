# ☁️ React Wordcloud

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

![image](https://github.com/chrisrzhou/react-wordcloud/raw/master/wordcloud.png)

## Install

```bash
yarn add react-wordcloud
```

Note that `react-wordcloud` requires `react^16.8.3` as a peer dependency.

## Examples

View all documented examples at https://react-wordcloud.netlify.com/

A simple example using only required props:

```js
import * as React from "react";
import ReactWordcloud from "react-wordcloud";

const words = [
  { text: "hello", value: 3 },
  { text: "world", value: 12.5 },
  { text: "github", value: 1 },
  { text: "code", value: 1 }
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

### Main Dependencies

- `react`
- `d3`
- `d3-cloud`
- `tippy.js`

### Codebase Overview

- `index.tsx`: Pure React code that exposes an interface of props.
- `render.ts`: Pure D3 rendering code to render wordcloud given a valid D3 selection and other data.
- `hooks.ts`: React hooks that build and destroy responsive SVG containers with D3.
- `types.ts`: Typescript types.
- `utils.ts`: Various simple functions used to compute derived data.

The code is written in `typescript`, linted with `eslint` + `prettier`, and built with `rollup`. Examples and documentations are built with `docz`.

Feel free to contribute by submitting a pull request.

## Wordcloud Generator

Create wordclouds using this wordcloud generator: https://chrisrzhou.github.io/wordcloud-generator/

Features supported:

- Editing and uploading text inputs
- Various NLP methods (stopwords, ngrams)
- Wordcloud configurations
- Export/save/share wordclouds
