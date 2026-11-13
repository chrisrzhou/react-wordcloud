# D3 WordCloud React

**Languages:** [English](README.md) · [Português (Brasil)](README.pt-BR.md) · [Italiano](README.it.md)

**Words become worlds.** An expressive React word-cloud component that combines D3 layout with a typed interface for data visualization, independently maintained by Cecil-IA Labs.

**[Explore the WordCloud Studio](https://cecil-ia-labs.github.io/d3-wordcloud-react/)** · **[Install from npm](https://www.npmjs.com/package/@cecilialabs/d3-wordcloud-react)** · **[Source on GitHub](https://github.com/cecil-ia-labs/d3-wordcloud-react)**

## What you can build

Interactive, responsive word clouds that make word frequency and thematic emphasis visible. Supply words with numeric weights, and customize layout, colors, font sizes, spirals, rotation, tooltips and click/hover interactions.

The library exports **`ReactWordCloud`** (plus the backwards-compatible `ReactWordcloud` alias). It accepts `words`, `options`, `callbacks`, and optional `size` or `minSize`.

## Quick start

```bash
npm install @cecilialabs/d3-wordcloud-react
```

```tsx
import { ReactWordCloud } from '@cecilialabs/d3-wordcloud-react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  { text: 'research', value: 42 },
  { text: 'design', value: 28 },
  { text: 'open source', value: 18 },
];

export function ResearchCloud() {
  return <ReactWordCloud words={words} />;
}
```

For a customized `options` and `callbacks` example, see the [technical reference](docs/README.legacy.en.md) and source types at [src/types.ts](src/types.ts).

## Current state and compatibility

The current package declares **React `^18.3.1`** as its peer dependency; do not treat React 19 as confirmed support unless separately validated. Version, supported options, and required dependencies are in [package.json](package.json). This independently maintained TypeScript fork includes D3 layout integration, tests, tooling and a release pipeline.

The **WordCloud Studio** is a static UX/showroom experiment with an original illustrative SVG arrangement. It does **not** execute the library's optimized D3 word collision engine or provide performance comparisons.

## Open source and authorship

This project descends from [Chris Zhou's react-wordcloud](https://github.com/chrisrzhou/react-wordcloud) and is maintained separately by Cecil-IA Labs. Original copyright and MIT license obligations remain preserved, with subsequent work attributed in [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE). Reuse, modifications and commercial forks are permitted under MIT terms with required notices.

**For contributors and AI agents:** read [AGENTS.md](AGENTS.md), the project [agent skills](.agents/skills/), and the [technical reference](docs/README.legacy.en.md). The showroom can be published by a manual GitHub Pages workflow only.
