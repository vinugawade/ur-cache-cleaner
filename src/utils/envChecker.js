const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { TOOL_TYPES, FILE_NAMES } = require('../constants');

/**
 * Determines the active environment (DDEV, LANDO, Drupal, or global tools on Web).
 *
 * @param {string} workspacePath - The path to the workspace folder.
 * @param {object} vscode - The VS Code API object.
 * @returns {string | null} - The detected environment type or null if none is found.
 */
function checkActiveEnv(workspacePath, vscode) {
  const isWeb = vscode.env.uiKind === 2;

  if (isWeb) {
    // In Web/Server mode: only check global executables
    const hasGlobal = (cmd) => {
      try {
        execSync(`which ${cmd}`, { stdio: 'ignore' });
        return true;
      } catch (e) {
        return false;
      }
    };

    if (hasGlobal('cv')) return TOOL_TYPES.DRUPAL;
    if (hasGlobal('drush')) return TOOL_TYPES.DRUPAL;

    return null;
  }

  // Desktop (normal fs checks)
  if (!workspacePath || !fs.existsSync(path.join(workspacePath, FILE_NAMES.COMPOSER_FILE))) {
    return null; // Ensure the workspace path and composer.json exist
  }

	// Check for DDEV environment
	if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DDEV_CONFIG_FILE))) {
		if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE))) {
			return TOOL_TYPES.DDEV;
		}
		return null; // DDEV config exists but Drush is missing
	}

	// Check for LANDO environment
	if (fs.existsSync(path.join(workspacePath, FILE_NAMES.LANDO_CONFIG_FILE))) {
		if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE))) {
			return TOOL_TYPES.LANDO;
		}
		return null; // LANDO config exists but Drush is missing
	}

	// Check for plain Drupal environment
	if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE))) {
		return TOOL_TYPES.DRUPAL;
	}

	// No environment detected
	return null;
}

module.exports = { checkActiveEnv };
