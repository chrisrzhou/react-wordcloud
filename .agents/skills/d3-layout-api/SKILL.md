---
name: d3-layout-api
description: Maintain typed ReactWordCloud props, D3 layout behavior, deterministic randomness and callback safety.
---
# D3 layout and public API

Use for changes to `src/index.tsx`, `src/layout.ts`, `src/types.ts`, `src/hooks.ts` or package dependencies.

1. Inspect source, type declarations, tests, peer dependencies and upstream attribution.
2. Preserve `ReactWordCloud` and alias `ReactWordcloud`, word input shape `{text,value}`, responsive sizing, options, and callback contracts.
3. Keep deterministic/random seed behavior reproducible. Test changes to layouts, spirals, rotation, tooltips and SVG attributes. Never infer React 19 support without explicit runtime validation.
4. Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. For performance changes, benchmark against controlled fixtures, not visual intuition.
5. Preserve Chris Zhou provenance, `NOTICE.md`, `LICENSE` and subsequent authorship. No autonomous npm publishing or release workflow edits.
