import babel from 'rollup-plugin-babel';

export default [
  {
    plugins: [
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
    ],
    input: 'src/index.tsx',
    external: ['d3-cloud', 'react'],
    output: [
      {
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
