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
      'd3',
      'd3-cloud',
      'react',
      'resize-observer-polyfill',
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
