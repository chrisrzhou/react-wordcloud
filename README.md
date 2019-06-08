# ☁️ React Wordcloud

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

![image](https://github.com/chrisrzhou/react-wordcloud/raw/master/wordcloud.png)

## Install

```bash
yarn add react-wordcloud
```

Note that `react-wordcloud` requires `react^16.8.3` as a peer dependency.

## Examples

### Documented Examples

View all documented examples and gallery of `react-globe` applications at https://react-globe.netlify.com/.

### Local Examples

You can also run the examples locally:

```bash
git clone git@github.com:chrisrzhou/react-globe

cd react-globe
yarn
yarn dev
```

### Basic Example (no props)

<img src="/public/basic.png" width="500px" />

[![Edit react-globe-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bgov9)

### Responsive Example

<img src="/public/basic.png" width="500px" />

[![Edit react-globe-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/55sb8)

### Configurable Options Example

<img src="/public/options.png" width="500px" />

[![Edit react-globe-interactive](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fnk8w)

## Development

### Main Dependencies

- `react`
- `d3`
- `d3-cloud`
- `tippy.js`

### Codebase Overview

- `index.tsx`: Pure React code that exposes an interface of props.
- `render.ts`: Pure D3 code to render wordcloud given a valid D3 selection and other data.
- `hooks.ts`: React hooks to construct and resize a responsive SVG container.
- `types.ts`: Typescript types.
- `utils.ts`: Various simple functions to compute derived data.

The code is written in `typescript`, linted with `eslint` + `prettier`, and bundled with `rollup`. Examples and documentations are built with `docz`.

Feel free to contribute by submitting a pull request.

## Wordcloud Generator

Create wordclouds using this wordcloud generator: https://chrisrzhou.github.io/wordcloud-generator/

Features supported:

- Editing and uploading text inputs
- Various NLP methods (stopwords, ngrams)
- Wordcloud configurations
- Export/save/share wordclouds

## TODOs

- [ ] Update dependencies and `docz`
- [ ] Expose types
- [ ] Update CHANGELOG
- [ ] Update `react-wordcloud-generator`

## Donate

My projects will always be (ads-)free. I constantly learn from the community, so these projects are a way of giving back to the community. If you liked this project or find it useful, feel free to buy me a cup of coffee ☕️ through a small donation!

[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/chrisrzhou/5)
