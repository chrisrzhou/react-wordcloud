export default {
	dest: 'dist/docs',
	menu: [
		'Home',
		'Readme',
		'Props',
		{
			name: 'Usage',
			menu: [
				'Basic',
				'Size',
				'Callbacks',
				'Transitions',
				'Options',
				'Optimizations',
			],
		},
		'Common Issues',
		'Changelog',
	],
	public: 'public',
	themeConfig: {
		styles: {
			root: {
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			},
		},
	},
	title: '☁️ React Wordcloud',
	typescript: true,
};
