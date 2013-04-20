
/**
 * Module dependencies.
 */

var Socket = require('tower-socket');

exports.view = require('tower-view');
exports.router = require('tower-router');
exports.route = app.router.route;
exports.session = require('tower-session');
exports.socket = new Socket();

exports.socket.get({ type: 'asset', message: 'reload' }, function(message){
  window.location.reload();
});