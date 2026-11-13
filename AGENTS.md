# AGENTS.md — d3-wordcloud-react

## Mission and scope
Maintain a typed React/D3 word cloud library and its independent public showroom. Avoid mixing showroom-only visualization code into the library distribution.

## Architecture and evidence
Read `package.json`, `src/index.tsx`, `src/types.ts`, `src/layout.ts`, `src/hooks.ts`, tests, `README.md`, `LICENSE` and `NOTICE.md` before changes. `ReactWordCloud` is canonical; `ReactWordcloud` is the compatibility alias.

## Local skills
Use `.agents/skills/d3-layout-api/SKILL.md` for component, layouts, callbacks and performance changes. Use `.agents/skills/wordcloud-showroom/SKILL.md` for `showcase/` design and documentation. Skills are scoped operational procedures, not substitutes for repository rules.

## Safety and compatibility
- Respect the current peer range `react: ^18.3.1`; React 19 is not supported merely because a CI experiment exists.
- Preserve D3's layout semantics, deterministic seed behavior, and tooltip callback expectations. Keep tests and public types aligned.
- Distinguish a visualization illustration from a measured/validated runtime behavior. The static showroom is NOT a D3-cloud collision benchmark.
- Preserve original Chris Zhou upstream attribution and MIT copyright notices; never relicense the fork by accident.

## Workflow
Work in a scoped feature branch, keep changes atomic, run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` for library changes and document any unavailable checks. Use `node --test showcase/tests/smoke.test.mjs` for the showroom. Prefer PR review into `main`; do not directly merge without maintainer approval.

## Cost and publishing controls
The showroom workflow uses manual `workflow_dispatch`, standard `ubuntu-latest` and SHA-pinned official Actions. Never add a `push` trigger, configure paid runners or publish an npm version without explicit maintainer authorization. Existing CI/release workflows are outside this showcase task.
