const commandExists = require('command-exists').sync;
const fs = require('fs');

/**
 * @param {object} cmd
 */
exports.command = (cmd) => {
  var result;
  if (commandExists(cmd.name)) {
    fs.access(cmd.path, err => {
      if (!err) {
        result = true;
      }
    });
  } else {
    result = `${cmd.title} is not installed, Please install globally on your system.`;
  }
  return result;
}