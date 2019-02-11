import babel from 'rollup-plugin-babel';

export default [
  {
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
    input: 'src/index.js',
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