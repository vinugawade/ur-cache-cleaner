const vscode = require('vscode');

/**
 * @param {any} activeTool
 * @param {string | vscode.Command} extDrushButtonId
 * @param {any} label
 */
function createStatusBarItem(activeTool, extDrushButtonId, label) {
	const extStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	const activeToolIcon = `$(${activeTool}-icon)`;

	extStatusBarItem.text = `${activeToolIcon} ${label}`;
	extStatusBarItem.tooltip = `${activeTool} setup is active`;
	extStatusBarItem.command = extDrushButtonId;  // Attach the command to the status bar item
	extStatusBarItem.show();

	return extStatusBarItem;
}

module.exports = { createStatusBarItem };
