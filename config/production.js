'use strict';

module.exports = function(config, packageJson){
  Object.assign(config, {
    restify:{
      port: 3000
    },
    bunyan: {
      name: packageJson.name || 'app',
      streams: [
        {
          path: '/var/log/' + config.name + '/api.info.log',
          level: 'info',
          period: '1d',
          count: 10
        },
        {
          path: '/var/log/' + config.name + '/api.warn.log',
          level: 'warn',
          period: '1d',
          count: 10
        },
        {
          path: '/var/log/' + config.name + '/api.error.log',
          level: 'error',
          period: '1d',
          count: 10
        }
      ],
    }
  })
};
