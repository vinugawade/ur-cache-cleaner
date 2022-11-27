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
		const extDrushButtonId = 'ur-cache-cleaner.drushClearCache';

		extStatusBarItem.command = extDrushButtonId;
		extStatusBarItem.name = `drush-clear-cache`;

		cmdRunner.exec(drush.version, (exps, stdout, stderr) => {
			if (stderr) {
				vscode.window.showErrorMessage(`${drush.title} error: ` + stderr);
			}
			if (exps) {
				vscode.window.showErrorMessage(`${drush.title}: ` + exps);
			}
			if (stdout) {
				drushVersion = stdout.split(':')[1].trim();
				extStatusBarItem.text = `$(clear-cache)  Drupal`;
				extStatusBarItem.tooltip = `Clear Cache (${drush.title} ${drushVersion})`;
			}
		});
		extStatusBarItem.show();

		const disposable = vscode.commands.registerCommand(extDrushButtonId, function () {
			// Change text while clearing cache.
			extStatusBarItem.tooltip = `Clearing Cache`;
			extStatusBarItem.text = `$(sync~spin)  Drupal`;
			// Execute clear cache command.
			drush.clearCache(extStatusBarItem, drushVersion);
		});

		context.subscriptions.push(disposable);
		context.subscriptions.push(extStatusBarItem);
	} else {
		vscode.window.showErrorMessage(result);
	}

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
