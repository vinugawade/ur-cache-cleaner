const { exec } = require('child_process');
const path = require('path');
const { FILE_NAMES, TOOL_TYPES, CMS_CMD } = require('../../constants');

/**
 * Executes the cache clear command based on the active tool.
 *
 * @param {string} activeTool - The currently active tool (drupal, ddev, lando).
 * @param {string} workspacePath - The path to the workspace folder.
 * @returns {Promise<string>} - Resolves with the command output, or rejects with an error.
 */
function executeClearCacheCommand(activeTool, workspacePath) {
  return new Promise((resolve, reject) => {
    let command = '';

    switch (activeTool) {
      case TOOL_TYPES.DRUPAL:
        command = `${path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE.replace('drush', CMS_CMD.DRUSH_CACHE))}`;
        break;

      case TOOL_TYPES.DDEV:
        command = 'ddev ' + CMS_CMD.DRUSH_CACHE;
        break;

      case TOOL_TYPES.LANDO:
        command = 'lando ' + CMS_CMD.DRUSH_CACHE;
        break;

      default:
        reject(new Error('Unknown tool or tool is not active.'));
        return;
    }

    // Execute the command
    exec(command, { cwd: workspacePath }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
      } else {
        // Check if stderr contains '[success]' and return it
        if (stderr.includes('[success]')) {
          // Extract the [success] message
          const successMessage = stderr.match(/\[success\].*/);
          resolve(successMessage ? successMessage[0] : stdout.trim());
        } else {
          resolve(stdout.trim());
        }
      }
    });
  });
}

module.exports = { executeClearCacheCommand };
