const vscode = require('vscode');
const cmdRunner = require('child_process');
const fs = require('fs');

// Drush settings.
const title = "Drush";
const name = "drush";
const root = vscode.workspace.rootPath;
const successMsg = "Cache rebuild completed.";

let cacheRebuild = checkDdevEnv() ? 'ddev drush cr' : `${root}/vendor/bin/${name} cr`;
let status = checkDdevEnv() ? 'ddev drush status' : `${root}/vendor/bin/${name} status`;

/**
 * Clears the cache and updates the status bar item.
 * @param {object} extStatusBarItem - The extension status bar item.
 * @param {string} drupalVersion - The Drupal version.
 * @param {string} drushVersion - The Drush version.
 */
function clearCache(extStatusBarItem, drupalVersion, drushVersion) {
	cmdRunner.exec(cacheRebuild, (exps, stdout, stderr) => {
		if (stderr) {
			let output = stderr.trim();
			if (output.includes('[success]')) {
				vscode.window.showInformationMessage(successMsg);
			} else {
				vscode.window.showErrorMessage(`${title} error: ${stderr}`);
			}
		}

		if (exps) {
			vscode.window.showErrorMessage('Exception: ' + exps);
		}

		if (stdout) {
			vscode.window.showInformationMessage('stdout: ' + stdout);
		}

		// Update the status bar item with cache clear information.
		extStatusBarItem.text = `$(clear-cache) Clear Cache`;
		extStatusBarItem.tooltip = `Drupal ${drupalVersion} (${title} ${drushVersion})`;
	});
}

/**
 * Checks if the workspace is running in ddev environment.
 * @returns {boolean} - Returns true if ddev environment is detected, false otherwise.
 */
function checkDdevEnv() {
	return fs.existsSync(`${root}/.ddev`);
}

module.exports = {
	title, // Drupal site title
	name, // Drush command name
	root, // Workspace root path
	status, // Drush command status
	clearCache, // Function to clear the cache
	checkDdevEnv // Function to check if ddev environment is detected
};