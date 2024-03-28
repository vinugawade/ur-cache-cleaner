// The module 'vscode' contains the VS Code extensibility API
const fs = require('fs');
const vscode = require('vscode');
const cmdRunner = require('child_process');
const drush = require('./commands/drush/cmd');
const wp = require('./commands/wp/cmd');
const check = require('./commands/check_cmd');
var drupalVersion, drushVersion;

/**
 * Activate the extension when the VS Code instance starts.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
	// Create a new status bar item that we can now manage.
	const extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	const result = check.command(drush);

	if (typeof (result) !== 'string') {
		// Assign values of status bar button.
		const extDrushButtonId = 'ur-cache-cleaner.drushClearCache';
		extStatusBarItem.command = extDrushButtonId;
		extStatusBarItem.name = 'drush-clear-cache';

		cmdRunner.exec(drush.status, (exps, stdout, stderr) => {

			if (stderr) {
				// Show command error.
				vscode.window.showErrorMessage(`${drush.title} error: ${stderr}`);
			}

			if (exps) {
				// Show command exception.
				vscode.window.showErrorMessage(`${drush.title} ${exps}`);
			}

			if (stdout && !exps && !stderr) {
				// Extract the version of Drupal and Drush from the output of the status command.
				const drupal_expression = /Drupal version\s+:\s(([0-9]\.*){1,})/g;
				const drush_expression = /Drush version\s+:\s(([0-9]\.*){1,})/g;
				drupalVersion = drupal_expression.exec(stdout)[1];
				drushVersion = drush_expression.exec(stdout)[1];

				extStatusBarItem.text = '$(clear-cache)  Clear Cache';
				extStatusBarItem.tooltip = `Drupal ${drupalVersion} (${drush.title} ${drushVersion})`;
				extStatusBarItem.show();
			}
		});

		const disposable = vscode.commands.registerCommand(extDrushButtonId, function () {
			// Change text while clearing cache.
			extStatusBarItem.text = '$(sync~spin)  Clearing Cache';
			extStatusBarItem.tooltip = 'Working on...';
			// Execute clear cache command.
			drush.clearCache(extStatusBarItem, drupalVersion, drushVersion);
		});

		context.subscriptions.push(disposable);
		context.subscriptions.push(extStatusBarItem);
	} else {
		// Show command not found error message.
		vscode.window.showErrorMessage(result);
	}
}

/**
 * Deactivates the extension.
 */
function deactivate() { }

module.exports = {
	activate,
	deactivate
};