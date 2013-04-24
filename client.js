var exports = module.exports = {};

var Socket = require('tower-socket');

exports.view = require('tower-view');
exports.router = require('tower-router');
exports.stream = require('tower-stream');
exports.query = require('tower-query');
exports.model = require('tower-model');
exports.route = exports.router.route;
exports.session = require('tower-session');
exports.socket = new Socket();

exports.socket.get({ type: 'asset', message: 'reload' }, function(message){
  window.location.reload();
});