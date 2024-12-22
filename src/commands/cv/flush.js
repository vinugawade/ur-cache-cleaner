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
function executeCivicrmClearCacheCommand(activeTool, workspacePath) {
  return new Promise((resolve, reject) => {
    let command = '';

    switch (activeTool) {
      case TOOL_TYPES.DRUPAL:
        command = `${path.join(workspacePath, FILE_NAMES.CIVICRM_EXECUTABLE.replace('cv', CMS_CMD.CIVICRM_CACHE))}`;
        break;

      case TOOL_TYPES.DDEV:
        command = 'ddev ' + CMS_CMD.CIVICRM_CACHE;
        break;

      case TOOL_TYPES.LANDO:
        command = 'lando ' + CMS_CMD.CIVICRM_CACHE;
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
        resolve(`CiviCRM: ${stdout.trim()}`);
      }
    });
  });
}

module.exports = { executeCivicrmClearCacheCommand };
