import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

export default [
  {
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      typescript(),
    ],
    input: 'src/index.tsx',
    external: [
      'd3-array',
      'd3-cloud',
      'd3-scale',
      'd3-scale-chromatic',
      'd3-selection',
      'd3-transition',
      'react',
      'resize-observer-polyfill',
      'seedrandom',
      'tippy.js',
    ],
    output: [
      {
        exports: 'named',
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
  },
];
