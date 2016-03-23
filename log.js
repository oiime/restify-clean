var bunyan = require('bunyan'),
    config = require('config');

module.exports = bunyan.createLogger(config.bunyan);
