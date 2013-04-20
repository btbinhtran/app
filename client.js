var Socket = require('tower-socket');


/**
 * Expose `create`.
 */

var app = {};

app.view = require('tower-view');
app.router = require('tower-router');
app.route = app.router.route;
app.session = require('tower-session');
app.socket = new Socket();

module.exports = app;


app.socket.get({ type: 'asset', message: 'reload' }, function(message) {
  window.location.reload();
});
