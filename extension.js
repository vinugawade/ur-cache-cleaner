// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode
const vscode = require('vscode');
const fs = require('fs');
const commandExists = require('command-exists');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// invoked without a callback, it returns a promise
	commandExists('drush')
		.then(function () {
			const extCommandId = 'ur-cache-cleaner.clearCache';
			var disposable = vscode.commands.registerCommand(extCommandId, function () {
				// The code you place here will be executed every time your command is executed
			});
			context.subscriptions.push(disposable);

			// create a new status bar item that we can now manage
			var extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
			extStatusBarItem.command = extCommandId;
			extStatusBarItem.text = `$(clear-cache)  Clear Cache (Drupal)`;

			var root = vscode.workspace.rootPath;
			var dir = root + '/vendor/drush';
			fs.access(dir, err => {
				if (err) {
					vscode.window.showErrorMessage(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" to install'`);
					// Debug
					console.log(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" to install'`)
				} else {
					extStatusBarItem.show();
				}
			})
			context.subscriptions.push(extStatusBarItem);
		}).catch(function () {
			vscode.window.showInformationMessage('Drush is not installed!, Please install drush globally on your system.');
		});
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
