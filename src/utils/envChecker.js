const fs = require('fs');
const path = require('path');
const { TOOL_TYPES, FILE_NAMES } = require('../constants');

/**
 * @param {string} workspacePath
 */
function checkActiveEnv(workspacePath) {
	if (!workspacePath || !fs.existsSync(path.join(workspacePath, FILE_NAMES.COMPOSER_FILE))) {
		return null;
	}

	if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DDEV_CONFIG_FILE))) {
		return TOOL_TYPES.DDEV;
	} else if (fs.existsSync(path.join(workspacePath, FILE_NAMES.LANDO_CONFIG_FILE))) {
		return TOOL_TYPES.LANDO;
	} else if (fs.existsSync(path.join(workspacePath, FILE_NAMES.DRUSH_EXECUTABLE))) {
		return TOOL_TYPES.DRUPAL;
	}

	return null;
}

module.exports = { checkActiveEnv };
