# d3-wordcloud-react

Typed React + D3 word cloud component built on the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

This is an **independently maintained fork** of Chris Zhou's [`react-wordcloud`](https://github.com/chrisrzhou/react-wordcloud), established to continue development beyond the original React 16-oriented dependency and tooling baseline. Cecil-IA Labs maintains its own codebase, public API decisions, tests, release process, and roadmap. It is **not an official upstream release**.

Its development includes a TypeScript implementation, changes to component and layout logic, modernized D3/dependency tooling, expanded documentation, automated Vitest tests, and CI/release workflows. The original upstream copyright and MIT license are preserved alongside copyright for subsequent modifications. See [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

**Supported React versions:** the current published `package.json` declares `react: ^18.3.1` as a peer dependency. Do not interpret TypeScript or toolchain compatibility as verified React 19 runtime support; update the peer range only after CI and runtime validation.

## Install

```bash
npm install @cecilialabs/d3-wordcloud-react
```

## Usage

### Minimal example

```tsx
import { ReactWordCloud } from '@cecilialabs/d3-wordcloud-react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  { text: 'told', value: 64 },
  { text: 'mistake', value: 11 },
  { text: 'thought', value: 16 },
  { text: 'bad', value: 17 },
];

export function SimpleWordCloud() {
  return <ReactWordCloud words={words} />;
}
```

`ReactWordCloud` renders responsively by default and enables tooltips out of the box. If you want tooltips to match the default styling shown in the examples, keep the Tippy CSS imports above.

### Fully customized example

```tsx
import { ReactWordCloud, type ReactWordCloudProps } from '@cecilialabs/d3-wordcloud-react';

const callbacks: ReactWordCloudProps['callbacks'] = {
  getWordColor: word => (word.value > 50 ? '#0d6efd' : '#dc3545'),
  getWordTooltip: word => `${word.text} (${word.value})`,
  onWordClick: (word, event) => {
    console.log('clicked', word.text, event.type);
  },
};

const options: ReactWordCloudProps['options'] = {
  fontFamily: 'Inter, system-ui, sans-serif',
  rotations: 2,
  rotationAngles: [-90, 0],
  transitionDuration: 450,
};

const size: [number, number] = [600, 400];

const words: ReactWordCloudProps['words'] = [
  { text: 'analysis', value: 42 },
  { text: 'design', value: 26 },
  { text: 'tests', value: 18 },
  { text: 'typescript', value: 12 },
];

export function RichWordCloud() {
  return (
    <ReactWordCloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );
}
```

### Exported types

The package also exports the component props and shared utility types, so you can type your own helpers against the same public contract:

```ts
import type {
  Callbacks,
  LayoutWord,
  Options,
  ReactWordCloudProps,
  Word,
} from '@cecilialabs/d3-wordcloud-react';
```

## API notes

- `ReactWordCloud` is the canonical export.
- `ReactWordcloud` is kept as a backwards-compatible alias.
- `words` must contain at least `text` and `value`.
- `options.svgAttributes` and `options.textAttributes` allow you to pass additional SVG attributes.
- `options.tooltipOptions` is forwarded to Tippy.js.

## Development

```bash
npm install
npm run lint
npm run lint:fix
npm run typecheck
npm test
npm run test:coverage
npm run build
```

## Release process

Releases are automated through GitHub Actions:

1. Update the package version.
2. Push the tagged commit to `main`.
3. The publish workflow builds the package and uploads the release artifacts to npm.

See [RELEASE.md](./RELEASE.md) for the manual release notes and maintenance checklist.
