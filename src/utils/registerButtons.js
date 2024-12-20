const vscode = require('vscode');
const { executeClearCacheCommand } = require('../commands/drush/cr');
const { createStatusBarItem } = require('./statusBar');

/**
 * Registers multiple buttons for different commands in the status bar.
 * @param {{subscriptions: vscode.Disposable[];}} context
 * @param {any} activeTool
 * @param {any} workspacePath
 */
async function registerButtons(context, activeTool, workspacePath) {
	// Define an array of commands with their corresponding button IDs, labels, and actions
	const commands = [
		{
			id: 'drush-clear-cache',
			label: 'Clear Cache',
			action: async () => {
				await executeCommand('Clear Cache', executeClearCacheCommand, activeTool, workspacePath);
			}
		},
		// You can add more commands here, like 'drush-status' etc.
		// Note :- Don't forget to add the corresponding command in package.json with keybinds.
	];

	// Register each button
	commands.forEach(command => {
		const extStatusBarItem = createStatusBarItem(activeTool, command.id, command.label);

		// Register the command that will be executed when the status bar button is clicked
		const disposable = vscode.commands.registerCommand(command.id, async () => {
			// Set the status bar to show spinning icon
			extStatusBarItem.text = '$(sync~spin) Clearing...';
			extStatusBarItem.tooltip = `Executing ${command.label}`;
			const activeToolIcon = `$(${activeTool}-icon)`;

			try {
				// Execute the corresponding action
				await command.action();

				// Update the status bar and show a success message after execution
				extStatusBarItem.text = `${activeToolIcon} ${command.label}`;
				extStatusBarItem.tooltip = `${activeTool} setup is active`;
			} catch (error) {
				// Update the status bar and show an error message if the command fails
				extStatusBarItem.text = `${activeToolIcon} ${command.label}`;
				extStatusBarItem.tooltip = `${activeTool} setup is active`;
				vscode.window.showErrorMessage(`Failed to execute ${command.label}:\n${error.message}`);
			}
		});

		// Add the disposable to the context to ensure cleanup
		context.subscriptions.push(disposable);

		// Make sure the status bar item is properly registered and visible
		context.subscriptions.push(extStatusBarItem);
	});
}

/**
 * Helper function to execute a command and track execution time.
 * @param {string} commandName - The command name to display in messages
 * @param {Function} executeCommandFunction - The function to execute (e.g., executeClearCacheCommand)
 * @param {any} activeTool - The active tool
 * @param {any} workspacePath - The workspace path
 */
async function executeCommand(commandName, executeCommandFunction, activeTool, workspacePath) {
	// Record the start time
	const startTime = performance.now();

	try {
		// Execute the command and wait for it to complete
		const output = await executeCommandFunction(activeTool, workspacePath);

		// Record the end time
		const endTime = performance.now();
		const executionTime = (endTime - startTime).toFixed(2);

		// Show the output with the execution time
		vscode.window.showInformationMessage(`${executionTime}ms: ${output}`);
	} catch (error) {
		// Record the end time in case of error as well
		const endTime = performance.now();
		const executionTime = (endTime - startTime).toFixed(2);

		// Show an error message with execution time
		vscode.window.showErrorMessage(`Failed to execute ${commandName} after ${executionTime}ms:\n${error.message}`);
	}
}

module.exports = { registerButtons };
