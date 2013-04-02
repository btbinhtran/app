
/**
 * Module dependencies.
 */

var ansi = require('ansi')
  , cursor = ansi(process.stdout, { enabled: true })
  // XXX: Move this into the `tower-log` module
  , consoleFn = require('./lib/console')
  , express = require('express')
  , Context = require('tower-context')
  , app = {}
  , server = {};

/**
 * Expose `create`.
 */

module.exports = create;

/**
 * Create a new `Application`.
 */

function create(appArg, server) {
  app = appArg || express();
  server = server;

  return Application;
}

function Application(name) {
  if (!(this instanceof Application)) return new Application(name);

  var self = this;

  this.options = {
    environment: server.environemnt
  };

  this.app = app;
  this.set('port', 3000);
  this.set('name', name);

  this.app.use('/public', express.static(process.cwd() + '/public'));

  // XXX: Not sure exactly how `server-router` is supposed to be used.
  this.app.use(function(req, res, next) {
    var context = new Context(req.url);
    self.router(context, function() {
      console.log(context.path);
    });
  });
}

Application.prototype.set = function(key, val){
  this.app.set(key, val);
};

Application.prototype.get = function(key){
  return this.app.get(key);
};

// XXX: `start` and `stop`
Application.prototype.listen = function(){
  this.bundler.compile();
  this.log("bundler", "Compiled Assets.")
  this.log("server", "Tower is listening on port -> {{port}}", {
    port: app.get('port')
  });
  return this.app.listen.apply(this.app, arguments);
}

Application.prototype.log = consoleFn;

Application.prototype.model = function model(){
  Application.prototype.model = require('tower-model');
  return Application.prototype.model.apply(Application.prototype.model, arguments);
}

Application.prototype.bundler = require('tower-bundle').bundler;
Application.prototype.route = require('tower-route');
Application.prototype.router = require('tower-router');
Application.prototype.bundle = require('tower-bundle');


