# Changelog

## [1.2.7](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.7...v1.2.6) (2020-08-07)
- Internal code cleanup (detypscriptify source code)
- Update docs, readme and other configs.

### 'Breaking' Changes: Tooltip CSS and Typings
Decoupled the `tippy` CSS from the package.  This will improve future versioning of the project, and is also the recommendation set by the `tippy` project.  Tooltips with this new versions might look off without CSS styles, but not considering this a breaking change because you can easily add the following imports to address the issue:

```js
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css'
```

Some rarely used typings are no longer exported (e.g. `Enter`, `Spiral`, `WordToStringCallback`, `WordEventCallback`, `MinMaxPair`, `AttributeValue`).  While this is a breaking change, taking the liberty to assume this as non-breaking in an effort to constrain the exposed typings for improved future versioning of the project.

## [1.2.6](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.6...v1.2.5) (2020-07-21)
- Correctly expose typings that were missing in `v1.2.5`.
- Fix docs deploy by adding `.node-version`.

## [1.2.5](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.5...v1.2.4) (2020-07-21)
`v1.2.4` is a working build, but it accidentally shipped `.docz` cache to the NPM registry...  Fix this by explicitly setting `files` in `package.json`.


## [1.2.4](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.4...v1.2.3) (2020-07-21)

- Added `...rest` props (@davidjb)
- Added `tooltipOptions` to `options` (@davidjb) to configure `tippy` tooltips.
- Added `svgAttributes` and `textAttributes` to `options` to configure attributes on `svg` and `text` nodes.
- Development: updated dependencies, XO lint rules, use absolute imports with `~`, spaces over tabs, `microbundle` over `rollup`, `npm` over `yarn`.
- Updated docs

## [1.2.3](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.3...v1.2.2) (2020-05-02)

Add `randomSeed` option to provide and control a seed for the random function when `deterministic` option is set to `true`.

## [1.2.2](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.2...v1.2.1) (2020-03-14)

### Typescript fix

Fix incorrect `'linearl'` literal type value for `Scale`.

## [1.2.1](https://github.com/chrisrzhou/react-wordcloud/compare/v1.2.0...v1.2.1) (2020-03-13)

Cleanup and fix `index.d.ts`.

## [1.2.0](https://github.com/chrisrzhou/react-wordcloud/compare/v1.1.1...v1.2.0) (2020-03-07)

This release is largely internal refactoring and updating dependencies, as well as 'de-typescripting' the codebase

### API additions:

- Improve rendering performance for larger clouds and multiple cloud instances with the `options.enableOptimizations` flag.

### Small Typescript breaking changes:

- `Spiral` and `Scale` enums are removed in favor of whitelisted string values. As part of moving to ambient declarations, these enums will not materialize in the compiled code.

### Internal code changes:

- Update underlying dependencies via `yarn upgrade --latest`. Remove a ton of unneeded dependencies and correctly move `@types/*` deps to `devDependencies`.
- Remove custom `eslint`, `prettier` config and use `xo` for a simpler linting setup.
- Add `husky` pre-push hook.
- Update and improve documentation with `docz@2.2.0`. Improved various doc pages (`Common Issues`) and added the `Optimizations` and `Home` page
- Take the approach in various projects (e.g. [three](https://github.com/mrdoob/three.js/)) to "de-typescript" the codebase and use `*.d.ts` files for typing in development. Continue to expose Typescript types to consumers.

## [1.1.1](https://github.com/chrisrzhou/react-wordcloud/compare/v1.1.0...v1.1.1) (2019-09-27)

- Update dependencies and fix `eval` error in `seedrandom` package ([link](https://github.com/davidbau/seedrandom/issues/64)).

## [1.1.0](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.8...v1.1.0) (2019-09-08)

- Update dev configs + dependencies. Check with `yarn audit`.
- Add documentation for `Options` and `Callbacks` props.
- Remove ignored Typescript errors, and fix typings in `render.ts`.
- Simplify code in `hooks.ts`.
- Simplify typed code.
- Expose `MouseEvent` object in `onWordClick`, `onWordMouseOut` and `onWordMouseOver` callbacks.

### Minor Typescript API Changes

- Exported Typescript types for component props have been changed slightly due to refactoring.

## [1.0.8](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.7...v1.0.8) (2019-06-08)

Correctly type optional `callbacks` and `options` props. Remove enums in favor of simpler union types.

## [1.0.7](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.6...v1.0.7) (2019-06-08)

Fix emitted types.

## [1.0.6](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.5...v1.0.6) (2019-06-08)

- Support deterministic behavior for randomn layout and colors by configuring the `options.deterministic` field. This makes testing and creating fixed wordcloud views convenient.
- Expose Typescript types.
- Use various `d3-*` packages instead of importing `d3` entirely.
- Update `docz` and docs. Add Codesandbox examples.
- Move prettier rules from `.eslintrc.js` to `.prettierrc.js`. This supports better formatting in MDX files with VSCode.

## [1.0.5](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.4...v1.0.5) (2019-03-16)

### New

- Added `FAQ` page explaining common 'bugs', and updated `Options` page with more examples
- Handled recursive attempts to layout 'bad' clouds. Provide a console warning when max attempts have been made to layout 'bad' clouds.
- Changed default `minSize` and `options.fontSizes` value to make things less buggy.

### Bug fixes

- Fixed a bug where `rotationAngles` was mutated.

## [1.0.4](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.3...v1.0.4) (2019-03-16)

Improve and simplify React hooks code after detailed understanding of: https://overreacted.io/a-complete-guide-to-useeffect/

### Bug fixes

- Handle words that don't fit in the boundary of the SVG by applying a font-size scale factor
- Handle large number of words

## [1.0.3](https://github.com/chrisrzhou/react-wordcloud/compare/v1.0.2...v1.0.3) (2019-03-14)

### Bug fixes

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
