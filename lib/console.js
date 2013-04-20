
/**
 * Module dependencies.
 */

var ansi = require('ansi')
  , cursor = ansi(process.stdout, { enabled: true });

/**
 * Expose `log`.
 */

module.exports = log;

// XXX: you want to make this into another module?
function log(action, message, vars) {
  for (var key in vars) {
    var val = vars[key];
    message = message.replace(new RegExp("\{\{" + key + "\}\}"), val);
  }

  cursor
    .hex("#0E5266")
    .bold()
    .write(action)
    .bg.grey()
    .write(" : ")
    .reset()
    .hex("#aaaaaa")
    .write(message)
    .write('\n');

    process.title = 'Tower';
}

log.clear = function() {
  function lf() { return '\n' }

  cursor
    .write(
      Array.apply(null, Array(process.stdout.getWindowSize()[1])).map(lf).join('')
    )
    .eraseData(2)
    .goto(1, 1);
};