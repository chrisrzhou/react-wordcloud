export default {
  dest: 'dist/docs',
  menu: [
    'README',
    'Props',
    {
      name: 'Usage',
      menu: ['Basic', 'Size', 'Callbacks', 'Transitions', 'Options'],
    },
    'Wordcloud Generator',
    'FAQ',
    'CHANGELOG',
    { name: 'Github', href: 'https://github.com/chrisrzhou/react-wordcloud' },
  ],
  public: 'public',
  themeConfig: {
    showPlaygroundEditor: true,
  },
  typescript: true,
};
