/**
 * Module dependencies.
 */

var ansi = require('ansi')
  , cursor = ansi(process.stdout, {
    enabled: true
  })
  , consoleFn = require('./lib/console')
  , express = require('express')
  . expressApp = null
  , Context = require('tower-context')
  , server = {}
  , fs = require('tower-fs');

/**
 * Expose `create`.
 */

module.exports = create;
module.exports.app = Application;

/**
 * Create a new `Application`.
 */

function create(appArg, server) {
  expressApp = appArg || express();
  server = server;
  return Application;
}

function Application(name) {

  Application.bundler.watch();

  Application.options = {
    environment: server.environemnt
  };

  Application.express = expressApp;
  Application.set('port', 3000);
  Application.set('name', name);
  // Set to false until the hot code push is implemented.
  Application.set('template caching', false);

  if (!Application.get('template path')) {
    Application.set('template path', fs.join(process.cwd(), 'templates'));
  }

  Application.express.use(require('express-chrome-logger'));

  Application.express.use('/public', require('express').static(process.cwd() + '/public'));
  // Handle the routing.
  Application.express.use(Application.router);

  Application.express.use(function(req, res, next) {
    res.send(404, 'Not Found');
  });

  return Application;
}


Application.set = function(key, val) {
  return Application.express.set(key, val);
};

Application.get = function(key) {
  return Application.express.get(key);
};

// XXX: `start` and `stop`
// XXX: Automatically load the bundler if the user doesn't
//      specify it's own configuration.
Application.listen = function() {

  Application.log("server", "Tower is listening on port -> {{port}}", {
    port: Application.express.get('port')
  });

  return Application.express.listen.apply(Application.express, arguments);
};

// XXX: Use the `logger` module
Application.log = consoleFn;

Application.model = function model() {
  Application.model = require('tower-model');
  return Application.model.apply(Application.model, arguments);
};

// XXX: Maybe lazy load everything?
Application.bundler = require('tower-bundle');
Application.route = require('tower-route');
Application.router = require('tower-router');
Application.graph = require('tower-graph');

/**
 * Lazy load the following modules.
 */

Application.adapter = function adapter() {
  Application.adapter = require('tower-adapter');
  return Application.adapter.apply(Application.adapter, arguments);
};

Application.view = require('tower-server-view');