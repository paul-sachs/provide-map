'use strict';

var webpack = require('webpack');

module.exports = {
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'redux': {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux'
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux'
    },
    'react-redux-provide': {
      root: 'ReactReduxProvide',
      commonjs2: 'react-redux-provide',
      commonjs: 'react-redux-provide',
      amd: 'react-redux-provide'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'provideMap',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
