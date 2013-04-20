
/**
 * Module dependencies.
 */

var fs = require('tower-fs');

/**
 * Create a new `Application`.
 */

exports.init = function(server){
  this.server = server;
  this.server.express.use(this.router);
  this.bundle = server.bundle;
  this.bundle.watch();
};

exports.view = require('tower-view');
exports.router = require('tower-router');
exports.route = require('tower-route');
exports.model = require('tower-model');
exports.adapter = require('tower-adapter');
exports.stream = require('tower-stream');
exports.query = require('tower-query');
exports.topology = require('tower-topology');

exports.start = function(){
  this.server.listen();
};

exports.stop = function(){

};