'use strict';
var NODE_ENV = process.env.NODE_ENV || 'development';

var bunyan = require('bunyan'),
    packageJson = require('../package.json');

var config = {
  name: packageJson.name || 'app',
  cluster: {
    workers: require('os').cpus().length
  }
}

require('./' + NODE_ENV)(config, packageJson);
module.exports = config;
