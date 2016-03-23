'use strict';
var validator = require( 'restify-json-schema-validation-middleware' )();
var testSchema = {
  type: 'object',
  properties: {
      param: { type: 'string' },
  },
  required: []
}

module.exports = function(server) {
  server.get('/test', function(req, res, next){
    res.send({'test': 'OK'})
    next();
  })
  server.post('/test', validator.params(testSchema), function(req, res, next){
    res.send({'test': 'OK'})
    next();
  })
};
