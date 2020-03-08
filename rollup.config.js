import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default {
	input: 'src/index.js',
	plugins: [
		autoExternal(),
		babel({
			exclude: 'node_modules/**',
		}),
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
	external: ['tippy.js/dist/tippy.css', 'tippy.js/animations/scale.css'],
};
