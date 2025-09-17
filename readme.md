# wordcloud-react-18

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.
This is a fork from [`☁️ react-wordcloud`](https://github.com/chrisrzhou/react-wordcloud), with updated dependencies and React 18.

![image](/public/wordcloud.png)

## Install

```sh
npm install wordcloud-react-18
```

## Use

### Simple

```js
import React from 'react';
import { ReactWordCloud } from 'wordcloud-react-18';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]

function SimpleWordcloud() {
  return <ReactWordCloud words={words} />
}
```

By default, `ReactWordCloud` is configured with animated tooltips enabled and requires CSS for styling. Tippy provides base styling in the resources above or you can create your own.

### Kitchen Sink

An example showing various features (callbacks, options, size).

```js
const callbacks = {
  getWordColor: word => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};
const size = [600, 400];
const words = [...];

function MyWordcloud() {
  return (
    <ReactWordcCloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );
}
```

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test
```

### Release Process

This project uses automated releases. To publish a new version:

1. Update version in `package.json`: `npm version [patch|minor|major]`
2. Push to main: `git push origin main`  
3. GitHub Actions will automatically create a release and publish to NPM

See [RELEASE.md](./RELEASE.md) for detailed information about the release process.

