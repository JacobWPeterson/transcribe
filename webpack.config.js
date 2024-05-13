const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/dist'),
  },
  watch: false,
  resolve: { fallback: { "url": false } },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'client/src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
    ],
  },
};
