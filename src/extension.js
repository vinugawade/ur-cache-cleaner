// The module 'vscode' contains the VS Code extensibility API
const fs = require('fs');
const vscode = require('vscode');
const cmdRunner = require('child_process');
const drush = require('./commands/drush/cmd');
const wp = require('./commands/wp/cmd');
const check = require('./commands/check_cmd');
var drupalVersion, drushVersion, wordpressVersion, wpVersion, extStatusBarItem, result;

/**
 * Activate the extension when the VS Code instance starts.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
	// Create a new status bar item that we can now manage.
	if (fs.existsSync(`${vscode.workspace.rootPath}/wp-config.php`)) {
		extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
		result = check.command(wp);
	}else {
		extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
		result = check.command(drush);
	}

	if (typeof (result) !== 'string') {
		if(!fs.existsSync(`${vscode.workspace.rootPath}/wp-config.php`)){
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
	}
	} else {
		// Show command not found error message.
		vscode.window.showErrorMessage(result);
	}

	if (typeof (result) !== 'string') {
		if(fs.existsSync(`${vscode.workspace.rootPath}/wp-config.php`)){
			// Assign values of status bar button.
			const extWpButtonId = 'ur-cache-cleaner.wpClearCache';
			extStatusBarItem.command = extWpButtonId;
			extStatusBarItem.name = 'wp-clear-cache';

			cmdRunner.exec(wp.version, (exps, stdout, stderr) => {

				if (stderr) {
					// Show command error.
					vscode.window.showErrorMessage(`${wp.title} error: ${stderr}`);
				}

				if (exps) {
					// Show command exception.
					vscode.window.showErrorMessage(`${wp.title} ${exps}`);
				}

				if (stdout) {
					// Extract the version of Drupal and wp from the output of the status command.
					const wordpress_expression = /\d+\.\d+\.\d+/g;
					wordpressVersion = wordpress_expression.exec(stdout)[0];

					// Update status bar item text and tooltip
					extStatusBarItem.text = '$(clear-cache) Clear Cache';
				}
			});

			cmdRunner.exec(wp.cliVersion, (exps, stdout, stderr) => {

				if (stderr) {
					// Show command error.
					vscode.window.showErrorMessage(`${wp.title} error: ${stderr}`);
				}

				if (exps) {
					// Show command exception.
					vscode.window.showErrorMessage(`${wp.title} ${exps}`);
				}

				if (stdout) {
					// Extract the version of Drupal and wp from the output of the status command.
					const wp_expression = /WP-CLI version:\s+(\d+\.\d+\.\d+)/g;
					wpVersion = wp_expression.exec(stdout)[1];
					// Update status bar tooltip
					extStatusBarItem.tooltip = `WordPress ${wordpressVersion} (${wp.title} ${wpVersion})`;
					extStatusBarItem.show();
				}
			});

			const wpBtn = vscode.commands.registerCommand(extWpButtonId, function () {
				// Change text while clearing cache.
				extStatusBarItem.text = '$(sync~spin)  Clearing Cache';
				extStatusBarItem.tooltip = 'Working on...';
				// Execute clear cache command.
				wp.clearCache(extStatusBarItem, wordpressVersion, wpVersion);
			});

			context.subscriptions.push(wpBtn);
			context.subscriptions.push(extStatusBarItem);
		}
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