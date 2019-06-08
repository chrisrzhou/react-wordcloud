import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

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
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.module.js',
        format: 'esm',
      },
    ],
  },
];
