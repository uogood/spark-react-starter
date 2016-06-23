import webpack from 'webpack';
import path from 'path';

const config = {
  target: 'web',
  cache: false,
  debug: false,
  devtool: false,
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/client-entry.js',
  ],
  output: {
    path: path.join( __dirname, '../../../static/dist' ),
    filename: 'app.js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new webpack.DefinePlugin( {
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEV__: false,
      'process.env.NODE_ENV': '"production"'
    } ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false,
      },
    } ),
    new webpack.ProvidePlugin( {
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    } ),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
      },
    ],
    noParse: /\.min\.js/,
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: [
      '',
      '.json',
      '.js',
      '.jsx',
    ],
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
};

export default config;
