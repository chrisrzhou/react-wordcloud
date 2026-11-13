# WordCloud Studio · standalone visual showroom

A static interactive SPA that uses original, self-contained SVG composition to demonstrate design controls and visual storytelling.

**Not a runtime demonstration of d3-cloud.** The SVG preview deliberately omits collision detection, D3 integration and performance profiling. For the real word layout and typed React API, install the npm package and use the source repository.

Preview locally: `python3 -m http.server --directory showcase 8000`. Validate structure: `node --test showcase/tests/smoke.test.mjs`.

The manual workflow `.github/workflows/publish-showcase.yml` uploads only the `showcase/` directory. It does not alter the npm package, release assets or default CI configuration. No automatic deploy is introduced.
