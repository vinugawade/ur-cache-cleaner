const commandExists = require('command-exists').sync;

/**
 * @param {object} cmd
 */
exports.command = (cmd) => {
  var result;
  if (commandExists(cmd.name)) {
    result = true;
  } else {
    result = `${cmd.title} launcher is not installed, Please install it globally on your system.`;
  }
  return result;
}