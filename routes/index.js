'use strict';
var log = require('log'),
    bunyan = require('bunyan'),
    restify = require('restify');

var defaults = function(server){
  server.on('uncaughtException', function (req, res, route, err) {
    log.error(err);
    res.send(500, new restify.InternalServerError());
  });
  server.on('NotFound', function (req, res, next) {
    req.log.debug('404', req.url);
    res.send(404, req.url + ' was not found');
  });
  server.pre(function (req, res, next) {
    req.log.info(req.connection.remoteAddress, req.method, req.url);
    next();
  });
}

module.exports = function(server){
  defaults(server);

  require("fs").readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      log.debug('LOAD_ROUTE', file);
      require('./' + file)(server)
    }
  });
};
