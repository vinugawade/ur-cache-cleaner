const vscode = require('vscode');
const cmdRunner = require('child_process');
const fs = require('fs');

// Drush settings.
const title = "Drush";
const name = "drush";
const root = vscode.workspace.rootPath;
const status = name + ' status --root=' + root;
const successMsg = "Cache rebuild completed.";
var cacheRebuild = "drush > /dev/null";

/**
 * @param {object} extStatusBarItem
 * @param {string} drupalVersion
 * @param {string} drushVersion
 */
function clearCache(extStatusBarItem, drupalVersion, drushVersion) {

	// Modify command if it's running in ddev environment.
	cacheRebuild = checkDdevEnv(cacheRebuild);

	cmdRunner.exec(cacheRebuild, (exps, stdout, stderr) => {
		if (stderr) {
			// Show success output & update values of status bar button.
			let output = stderr.trim();
			if (output.includes('[success]')) {
				vscode.window.showInformationMessage(successMsg);
				console.log(successMsg);
			} else {
				vscode.window.showErrorMessage(`${title} error: ` + stderr);
				console.log(stderr);
			}
			extStatusBarItem.text = `$(clear-cache)  Clear Cache`;
			extStatusBarItem.tooltip = `Drupal ${drupalVersion} (${title} ${drushVersion})`;
		}

		if (exps) {
			// Show exception & update values of status bar button.
			vscode.window.showErrorMessage('Exception: ' + exps);
			console.log(exps);
			extStatusBarItem.text = `$(clear-cache)  Clear Cache`;
			extStatusBarItem.tooltip = `Drupal ${drupalVersion} (${title} ${drushVersion})`;
		}

		if (stdout) {
			// Show output & update values of status bar button.
			vscode.window.showInformationMessage('stdout: ' + stdout);
			console.log(stdout);
			extStatusBarItem.text = `$(clear-cache)  Clear Cache`;
			extStatusBarItem.tooltip = `Drupal ${drupalVersion} (${title} ${drushVersion})`;
		}
	});
}

/**
 * @param {string} cacheRebuildCmd
 */
function checkDdevEnv(cacheRebuildCmd) {
	// Check .ddev directory exist or not in workspace.
	var ddev_config = root + '/.ddev'
	if (fs.existsSync(ddev_config)) {
		cacheRebuildCmd = `ddev ` + name + ` cr`;
	} else {
		cacheRebuildCmd = name + ' cr --root=' + root;
	}
	return cacheRebuildCmd;
}

module.exports = {
	title,
	name,
	root,
	status,
	clearCache,
	checkDdevEnv
}