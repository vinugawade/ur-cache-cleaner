const commandExists = require('command-exists').sync;

/**
 * Checks if a command exists.
 * @param {object} cmd - The command object.
 * @returns {boolean|string} - Returns true if the command exists, or an error message if it doesn't.
 */
exports.command = (cmd) => {
  if (commandExists(cmd.name)) {
    return true;
  } else {
    return "Drush launcher is not installed. Please install it globally on your system.";
  }
};