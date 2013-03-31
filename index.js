
/**
 * Module dependencies.
 */

var container = require('tower-container')
  , bundler = require('tower-bundle')
  , bundle = bundler.bundle
  , ansi = require('ansi')
  , cursor = ansi(process.stdout, { enabled: true })
  , consoleFn = require('./lib/console')
  , route = require('tower-route')
  , express = require('express')
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
  app = appArg;
  server = server;

  return Application;
}

function Application(name) {
  if (!(this instanceof Application)) return new Application(name);

  this.options = {
    environment: server.environemnt
  };

  this.app = app;
  this.set('port', 3000);
  this.set('name', name);
  this.container = container;
  this.view = {};
  this.bundler = bundler();
  this.bundle = bundle;
  this.model = {};
  this.stream = {};
  this.route = route;
  this.server = {};

  this.app.use('/public', express.static(process.cwd() + '/public'));
}

Application.prototype.set = function(key, val){
  this.app.set(key, val);
};

Application.prototype.get = function(key){
  return this.app.get(key);
};

Application.prototype.listen = function(){
  this.bundler.compile();
  this.log("bundler", "Compiled Assets.")
  // Check if we're running in dev mode.
  // Run the bundler:
  //this.bundle.watch();
  this.log("server", "Tower is listening on port -> {{port}}", {
    port: app.get('port')
  });
  return this.app.listen.apply(this.app, arguments);
}

Application.prototype.log = consoleFn;

Application.prototype.model = function(){
  return Application.prototype.model = require('tower-model');
}