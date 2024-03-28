const vscode = require('vscode');
const cmdRunner = require('child_process');
const fs = require('fs');

// wp settings.
const title = "wp";
const name = "wp";
const root = vscode.workspace.rootPath;
const successMsg = "Success: The cache was flushed.";

let cacheRebuild = checkDdevEnv() ? 'ddev wp cache flush' : `wp cache flush --path='${root}'`;
let version = checkDdevEnv() ? 'ddev wp core version' : `wp core version --path='${root}'`;
let cliVersion = checkDdevEnv() ? 'ddev wp --info' : `wp --info`;

/**
 * Clears the cache and updates the status bar item.
 * @param {object} extStatusBarItem - The extension status bar item.
 * @param {string} wordpressVersion - The wordpress version.
 * @param {string} wpVersion - The wp version.
 */
function clearCache(extStatusBarItem, wordpressVersion, wpVersion) {
	cmdRunner.exec(cacheRebuild, (exps, stdout, stderr) => {
		if (stderr) {
			vscode.window.showErrorMessage(`${title} error: ${stderr}`);
		}

		if (exps) {
			vscode.window.showErrorMessage('Exception: ' + exps);
		}

		if (stdout) {
			let output = stdout.trim();
			if (output.includes('Success')) {
				vscode.window.showInformationMessage(successMsg);
			} else {
				vscode.window.showInformationMessage('stdout: ' + stdout);
			}
		}

		// Update the status bar item with cache clear information.
		extStatusBarItem.text = `$(clear-cache) Clear Cache`;
		extStatusBarItem.tooltip = `Wordpress ${wordpressVersion} (${title} ${wpVersion})`;
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
	title, // Wordpress site title
	name, // wp command name
	root, // Workspace root path
	version, // Wordpress command version
	cliVersion, // wp CLI version
	clearCache, // Function to clear the cache
	checkDdevEnv // Function to check if ddev environment is detected
};