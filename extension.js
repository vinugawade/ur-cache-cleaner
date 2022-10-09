// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const commandExists = require('command-exists');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// invoked without a callback, it returns a promise
	commandExists('drush')
		.then(function (command) {
			var root = vscode.workspace.rootPath;
			var dir = root + '/vendor/drush';
			fs.access(dir, err => {
				if (err) {
					vscode.window.showErrorMessage(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" to install'`);
					console.log(`Please add Drush with Composer to your project. Run 'cd "${root}" and Run "composer require drush/drush" to install'`)
				}
			})
			vscode.window.showInformationMessage('Drush is installed!');
			// console.log(vscode.workspace.rootPath + '/vendor/drush');
			// proceed
		}).catch(function () {
			// Display a message box to the user
			vscode.window.showInformationMessage('Drush not installed!');
			console.log(vscode.workspace);
		});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ur-cache-cleaner.clearDrupalCache', function () {
		// The code you place here will be executed every time your command is executed

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
