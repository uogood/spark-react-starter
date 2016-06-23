import webpack from 'webpack';
import config from './webpack.client.config';

const wds = {
  hostname: process.env.HOSTNAME || 'localhost',
  port: 8080,
};

config.cache = true;
config.debug = true;
config.devtool = 'cheap-module-eval-source-map';

config.entry.unshift(
  'webpack-dev-server/client?http://' + wds.hostname + ':' + wds.port,
  'webpack/hot/only-dev-server',
);

config.devServer = {
  publicPath: 'http://' + wds.hostname + ':' + wds.port + '/',
  hot: true,
  inline: false,
  lazy: false,
  quiet: false,
  noInfo: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  stats: {
    colors: true,
  },
  host: wds.hostname,
};

config.output.publicPath = config.devServer.publicPath;
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.DefinePlugin( {
    __CLIENT__ : true,
    __SERVER__ : false,
    __PRODUCTION__:  false,
    __DEV__ : true,
    'process.env.NODE_ENV': '"development"'
  } ),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin( {
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  } ),
];

export default config;
