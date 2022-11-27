const vscode = require('vscode');
const cmdRunner = require('child_process');

// Drush commands.
const title = "Drush";
const name = "drush";
const root = vscode.workspace.rootPath;
const path = root + '/vendor/drush/drush';
const version = path + '/' + name + ' version';
const cr = path + '/' + name + ' cr';
const successMsg = "[success] Cache rebuild complete.";

/**
 * @param {object} extStatusBarItem
 * @param {string} drushVersion
 */
function clearCache(extStatusBarItem, drushVersion) {
	cmdRunner.exec(cr, (exps, stdout, stderr) => {
		if (stderr) {
			let output = stderr.trim();
			if (output == successMsg) {
				vscode.window.showInformationMessage(successMsg);
				console.log(successMsg);

				extStatusBarItem.text = `$(clear-cache)  Drupal`;
				extStatusBarItem.tooltip = `Clear Cache (${title} ${drushVersion})`;
			} else {
				vscode.window.showErrorMessage('${title} error: ' + stderr);
				console.log(stderr);
			}
		}
		if (exps) {
			vscode.window.showErrorMessage('Exception: ' + exps);
			console.log(exps);
		}
		if (stdout) {
			vscode.window.showInformationMessage('stdout: ' + stdout);
			console.log(stdout);
		}
	});
}

module.exports = {
	title,
	name,
	path,
	version,
	clearCache,
}