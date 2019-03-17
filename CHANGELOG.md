# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.5](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.4...v1.0.5) (2019-03-16)

### New:

- Added `FAQ` page explaining common 'bugs', and updated `Options` page with more examples
- Handled recursive attempts to layout 'bad' clouds. Provide a console warning when max attempts have been made to layout 'bad' clouds.
- Changed default `minSize` and `options.fontSizes` value to make things less buggy.

### Bug fixes:

- Fixed a bug where `rotationAngles` was mutated.

## [1.0.4](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.3...v1.0.4) (2019-03-16)

Improve and simplify React hooks code after detailed understanding of: https://overreacted.io/a-complete-guide-to-useeffect/

### Bug fixes:

- Handle words that don't fit in the boundary of the SVG by applying a font-size scale factor
- Handle large number of words

## [1.0.3](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.2...v1.0.3) (2019-03-14)

### Bug fixes:

- https://github.com/chrisrzhou/react-wordcloud/issues/5
- https://github.com/chrisrzhou/react-wordcloud/issues/11

Tooltip bug is fixed by programmatically creating and destroying the `tippy` instance. Word implosion and missing words are related to https://github.com/jasondavies/d3-cloud/issues/36, and is fixed with a recursive solution.

## [1.0.2](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.1...v1.0.2) (2019-03-06)

Thanks to @warlock for transferring the NPM `react-wordcloud` to me!
Updating `package.json` and pushing package to NPM.

## [1.0.1](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.0...v1.0.1) (2019-03-06)

Change `word.count` to `word.key` because the weight of the word could be a float.

## [1.0.0](https://github.com/chrisrzhou/react-wordcloud/compare/v0.1.1...v1.0.0) (2019-03-03)

### Features

As part of learning and ramping up with better JS tools and frameworks, v1.0.0 is a modern rewrite that focuses on:

- Simplifying and decoupling React/D3 code with React hooks.
- Document examples with `docz`.
- Typescript support.
- Minimize build size with `rollup` and `bundlesize`.

### Breaking Changes

Compared to v0, there are a number of breaking changes.

- **React Dependency**: You need at least `react^16.8.3` installed to access hook functionality.
- **Features**: Most features of the component still remain the same (e.g. tooltips, min/max font size, responsive).
- **Props**: Many v0 props have been merged into `options` and `callbacks` with potentially different names.
- **Development**: Previous developments were done in `flow` and a lot of dev dependencies have changed. The scripts in `package.json` should help handle most of these changes.
