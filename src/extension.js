const vscode = require('vscode');
const { checkActiveEnv } = require('./utils/envChecker');
const { registerButtons } = require('./utils/registerButtons');

/**
 * Activate the extension when the VS Code instance starts.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (!workspaceFolders || workspaceFolders.length === 0) {
		// No workspace folder is open.
		return;
	}

	const workspacePath = workspaceFolders[0].uri.fsPath;

	// Determine the active tool
	const activeTool = checkActiveEnv(workspacePath, vscode);

	// If an active tool is found, create the status bar item and commands
	if (activeTool) {
		registerButtons(context, activeTool, workspacePath);
	}
}

function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
