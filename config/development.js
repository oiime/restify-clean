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
          stream: process.stdout,
          level: 'debug'
        },
        {
          stream: process.stdout,
          level: 'warn'
        },
        {
          stream: process.stdout,
          level: 'error'
        }
      ],
    }
  })
};
