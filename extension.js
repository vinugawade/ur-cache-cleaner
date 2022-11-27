// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const fs = require('fs');
const cmdRunner = require('child_process');
const commandExists = require('command-exists');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	var drushVersion;

	// Create a new status bar item that we can now manage.
	const extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	const extCommandId = 'ur-cache-cleaner.clearCache';
	extStatusBarItem.command = extCommandId;
	extStatusBarItem.name = `clear-cache`;

	// Default paths.
	const root = vscode.workspace.rootPath;
	const drushDir = root + '/vendor/drush/drush';
	const version = drushDir + '/drush version';
	const cacheRebuild = drushDir + '/drush cr';

	// Get gloably installed drush version.
	commandExists('drush')
		.then(function () {
			// @todo Ask for drush path in notification.
			fs.access(drushDir, err => {
				if (err) {
					//  @todo Prevent showing drush not found error in other project.
					throw 'drushNotFound';
				} else {
					cmdRunner.exec(version, (exps, stdout, stderr) => {
						if (stderr) {
							vscode.window.showErrorMessage('Drush error: ' + stderr);
						}
						if (exps) {
							vscode.window.showErrorMessage('Exception:' + exps);
						}
						if (stdout) {
							drushVersion = stdout.split(':')[1].trim();
							extStatusBarItem.text = `$(clear-cache)  Drupal`;
							extStatusBarItem.tooltip = `Clear Cache (Drush ${drushVersion})`;
						}
					});
					extStatusBarItem.show();
				}
			})

			const disposable = vscode.commands.registerCommand(extCommandId, function () {
				// Change text while clearing cache.
				extStatusBarItem.tooltip = `Clearing Cache`;
				extStatusBarItem.text = `$(sync~spin) Drupal`;

				// Execute clear cache command.
				cmdRunner.exec(cacheRebuild, (exps, stdout, stderr) => {
					if (stderr) {
						let successMsg = stderr.trim();
						if (successMsg == "[success] Cache rebuild complete.") {
							extStatusBarItem.text = `$(clear-cache) Clear Cache`;
							extStatusBarItem.tooltip = `Drupal (Drush ${drushVersion})`;
							vscode.window.showInformationMessage(successMsg);
							console.log(successMsg);
						} else {
							vscode.window.showErrorMessage('Drush error: ' + stderr);
							console.log(stderr);
						}
					}
					if (exps) {
						vscode.window.showErrorMessage('Exception:' + exps);
						console.log(exps);
					}
					if (stdout) {
						vscode.window.showInformationMessage('stdout: ' + stdout);
					}
				});
			});

			context.subscriptions.push(disposable);
			context.subscriptions.push(extStatusBarItem);
		}).catch(function (exp) {
			if (exp == "drushNotFound") {
				vscode.window.showErrorMessage(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" for install drush in your project'`);
				console.log(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" for install drush in your project'`);
			}else{
				vscode.window.showErrorMessage('Drush is not installed, Please install drush globally on your system.');
			}
		});
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
