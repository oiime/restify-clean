'use strict';
require('app-module-path').addPath(__dirname);

var config = require('config'),
    log = require('log'),
    cluster = require('cluster'),
    restify = require('restify');

var bootstrap = {
  restify: function(){
    var server = restify.createServer({
      name: config.name,
      log: log
    });
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.jsonp());
    server.use(restify.bodyParser());
    restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
    restify.CORS.ALLOW_HEADERS.push('Accept-Language');
    server.use(restify.CORS());
    return server;
  }
};

var modes = {
  server: function(){
    var server = bootstrap.restify();
    require('routes')(server);
    server.listen(config.restify.port, function () {
      log.info('%s listening at %s', server.name, server.url);
    });
  },
  cluster: function(){
    if (cluster.isMaster) {
      log.info('MASTER: ' + process.pid + ' | '  + config.cluster.workers + ' workers');
      for (var i = 0; i < config.cluster.workers; i++) {
        cluster.fork();
      }
      cluster.on('listening', function (worker) {
        log.info('WORKER: ' + worker.id + ' started');
      });
      cluster.on('death', function (worker) {
        log.warn('WORKER: ' + worker.id + ' died, restarting');
        cluster.fork();
      });

    } else {
      modes.server();
    }
  }
};
// parse arguments
var mode = process.argv[2] || 'server';

if(!modes.hasOwnProperty(mode)){
  log.error('Unknown run mode: ' + mode);
} else {
  modes[mode]();
}
