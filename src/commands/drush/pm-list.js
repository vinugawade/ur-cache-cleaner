const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const { FILE_NAMES, TOOL_TYPES, CMS_CMD } = require('../../constants');
const vscode = require('vscode');

/**
 * Executes the cache clear command based on the active tool.
 *
 * @param {string} activeTool - The currently active tool (drupal, ddev, lando).
 * @param {string} workspacePath - The path to the workspace folder.
 * @returns {Promise<boolean>} - Resolves with the command output, or rejects with an error.
 */
function isCivicrmActiveCommand(activeTool, workspacePath) {
  return new Promise((resolve, reject) => {
    let command = '';

    switch (activeTool) {
      case TOOL_TYPES.DRUPAL:
        command = `${path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE.replace('drush', CMS_CMD.DRUSH_CIVICRM_CHECK))}`;
        break;

      case TOOL_TYPES.DDEV:
        return reject('DDEV is not supported yet.');
        // command = 'ddev ' + CMS_CMD.DRUSH_CIVICRM_CHECK;
        // break;

      case TOOL_TYPES.LANDO:
        return reject('LANDO is not supported yet.');
        // command = 'lando ' + CMS_CMD.DRUSH_CIVICRM_CHECK;
        // break;

      default:
        reject(new Error('Unknown tool or tool is not active.'));
        return;
    }

    exec(command, { cwd: workspacePath }, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(stderr || error.message);
        return reject(new Error(stderr || error.message));
      }

      try {
        const output = JSON.parse(stdout);

        if (!output || Object.keys(output).length === 0) {
          return reject(new Error('No modules found. CiviCRM is not enabled.'));
        }

        const isEnabled = (/** @type {string} */ module) => {
          const moduleStatus = output[module];
          const isModuleEnabled = moduleStatus && moduleStatus.status === "Enabled";
          return isModuleEnabled;
        };

        const allEnabled = isEnabled('civicrm') && isEnabled('civicrmtheme');
        const executableExists = fs.existsSync(path.join(workspacePath, FILE_NAMES.CIVICRM_EXECUTABLE));

        if (!allEnabled || !executableExists) {
          const missingMessage = !executableExists
            ? `'cv' executable doesn't exist in '${FILE_NAMES.CIVICRM_EXECUTABLE}'.\nPlease run 'composer require civicrm/cli-tools' to install the CiviCRM CLI tools.`
            : 'CiviCRM or CiviCRM Theme is not enabled.';
          vscode.window.showErrorMessage(missingMessage);
          return reject(new Error(missingMessage));
        }

        resolve(true); // Resolves successfully without a boolean.
      } catch (err) {
        vscode.window.showErrorMessage('Failed to parse stdout JSON: ' + err.message);
        reject(new Error('Failed to parse stdout JSON: ' + err.message));
      }
    });
  });
}

module.exports = { isCivicrmActiveCommand };
