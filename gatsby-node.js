const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '..'), 'node_modules'],
      alias: {
        '~': path.resolve(__dirname, '..'),
      },
    },
  });
};
