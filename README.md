# ☁️ React Wordcloud

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

![image](/public/wordcloud.png)

## Install

```bash
yarn add react-wordcloud
```

Note that `react-wordcloud` requires `react^16.8.3` as a peer dependency.

## Options

| Props           | Type          | Example               |
| --------------- |:-------------:|:---------------------:|
| colors          | array         | ['#1f77b4', '#ff7f0e']|
| enableTooltip   | bool          | true                  |
| deterministic   | bool          | true                  |
| fontFamily      | string        | 'impact'              |
| fontSizes       | array         | [5, 60]               |
| fontStyle       | string        | 'normal               |
| fontWeight      | string        | 'normal               |
| padding         | number        | 1                     |
| rotations       | number        | 3                     |
| rotationAngles  | array         | [0, 90]               |
| scale           | string        | 'sqrt'                |
| spiral          | string        | 'archimedean'         |
| enableTransiton | bool          | true                  |
| transitionDuration | number     | 1000                  |

## Examples

### Documented Examples

View all documented examples and gallery of `react-wordcloud` applications at https://react-wordcloud.netlify.com/.

### Local Examples

You can also run the examples locally:

```bash
git clone git@github.com:chrisrzhou/react-wordcloud
cd react-wordcloud && yarn && yarn dev
```

### Basic Example (no props)

[![Edit react-wordcloud-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bgov9)

### Responsive Example

[![Edit react-wordcloud-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/55sb8)

### Configurable Options Example

[![Edit react-wordcloud-interactive](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fnk8w)

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

Create wordclouds using this wordcloud generator: https://wordcloud-generator.netlify.com/

Features supported:

- Edit and Upload text inputs
- Various NLP methods (stopwords, ngrams)
- Wordcloud configurations
- Export/save/share wordclouds

## Donate

My projects will always be (ads-)free. I constantly learn from the community, so these projects are a way of giving back to the community. If you liked this project or find it useful, feel free to buy me a cup of coffee ☕️ through a small donation!

[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/chrisrzhou/5)
