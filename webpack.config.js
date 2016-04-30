var path = require('path');

module.exports = {
  entry: path.resolve(path.join(__dirname, 'lib', 'sketchpad.js')),
  output: {
    path: path.resolve(path.join(__dirname, '.', 'dist')),
    library: 'module',
    libraryTarget: 'umd',
    filename: 'sketchpad.js',
  },
  module: {
    loaders: [{test: /\.js?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'}],
  },
};
