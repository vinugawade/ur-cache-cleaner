// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const cmdRunner = require('child_process');
const drush = require('./commands/drush/cmd');
const check = require('./commands/check_cmd');
var drushVersion;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Create a new status bar item that we can now manage.
	const extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	const result = check.command(drush);

	if (typeof (result) !== 'string') {
		// Assign values of status bar button.
		const extDrushButtonId = 'ur-cache-cleaner.drushClearCache';
		extStatusBarItem.command = extDrushButtonId;
		extStatusBarItem.name = `drush-clear-cache`;

		cmdRunner.exec(drush.version, (exps, stdout, stderr) => {
			if (stderr) {
				// Show command error.
				vscode.window.showErrorMessage(`${drush.title} error: ` + stderr);
			}
			if (exps) {
				// Show command exception.
				vscode.window.showErrorMessage(`${drush.title} ` + exps);
			}
			if (stdout && !exps && !stderr) {
				// Get drush version from command output.
				drushVersion = stdout.split(':')[1].trim();
				extStatusBarItem.text = `$(clear-cache)  Clear Cache`;
				extStatusBarItem.tooltip = `Drupal (${drush.title} ${drushVersion})`;
				extStatusBarItem.show();
			}
		});

		const disposable = vscode.commands.registerCommand(extDrushButtonId, function () {
			// Change text while clearing cache.
			extStatusBarItem.text = `$(sync~spin)  Clearing Cache`;
			extStatusBarItem.tooltip = `Working on...`;
			// Execute clear cache command.
			drush.clearCache(extStatusBarItem, drushVersion);
		});

		context.subscriptions.push(disposable);
		context.subscriptions.push(extStatusBarItem);
	} else {
		// Show command not found error message.
		vscode.window.showErrorMessage(result);
	}

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
