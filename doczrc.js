export default {
  dest: 'dist/docs',
  editBranch: 'main',
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
    'FAQ',
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
