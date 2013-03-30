var container = require('tower-container')
  , bundle = require('tower-bundle');

var app = {};

function create(appArg) {
  app = appArg;

  return Application;
}

function Application(name) {
  if (!(this instanceof Application)) {
    return new Application(name);
  }

  this.options = {};
  this.app = app;
  this.set('port', 3000);
  this.set('name', name);
  this.container = container;
  this.view = {};
  this.bundle = bundle;
  this.model = {};
  this.stream = {};
  this.route = {};
  this.server = {};
}

Application.prototype.set = function(key, value) {
  this.app.set(key,value);
};

Application.prototype.get = function(key) {
  return this.app.get(key);
};

Application.prototype.listen = function() {
  this.bundle.initialize();
  // Check if we're running in dev mode.
  // Run the bundler:
  //this.bundle.watch();

  return this.app.listen.apply(this.app, arguments);
}

module.exports = create;