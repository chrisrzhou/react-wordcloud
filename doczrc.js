export default {
  dest: 'dist/docs',
  hashRouter: true,
  menu: [
    'README',
    {
      name: 'Usage',
      menu: ['Props', 'Basic', 'Size', 'Callbacks', 'Transitions', 'Options'],
    },
    'Wordcloud Generator',
    'FAQ',
    'CHANGELOG',
    { name: 'Github', href: 'https://github.com/chrisrzhou/react-wordcloud' },
  ],
  public: 'docs/public',
  typescript: true,
};
