const fs = require('fs');
const path = require('path');
const { TOOL_TYPES, FILE_NAMES } = require('../constants');

/**
 * Determines the active environment (DDEV, LANDO, or Drupal).
 *
 * @param {string} workspacePath - The path to the workspace folder.
 * @returns {string | null} - The detected environment type or null if none is found.
 */
function checkActiveEnv(workspacePath) {
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
