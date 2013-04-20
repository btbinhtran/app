/**
 * Module dependencies.
 */


var fs = require('tower-fs');

/**
 * Create a new `Application`.
 */

var app = {

  init: function(server) {
    this.server = server;
    this.server.express.use(this.router);
    this.bundle = server.bundle;
    this.bundle.watch();
  }

  , view: require('tower-server-view')
  , router: require('tower-router')
  , route: require('tower-route')
  , model: require('tower-model')
  , adapter: require('tower-adapter')
  , stream: require('tower-stream')

};

app.start = function() {
  this.server.listen();
};

app.stop = function() {

};


/**
 * Expose `create`.
 */

module.exports = app;