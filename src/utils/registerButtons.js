const vscode = require('vscode');
const { executeClearCacheCommand } = require('../commands/drush/cr');
const { isCivicrmActiveCommand } = require('../commands/drush/pm-list');
const { executeCivicrmClearCacheCommand } = require('../commands/cv/flush');
const { createStatusBarItem } = require('./statusBar');

/**
 * Registers multiple buttons for different commands in the status bar.
 * @param {{subscriptions: vscode.Disposable[];}} context
 * @param {string} activeTool
 * @param {string} workspacePath
 */
async function registerButtons(context, activeTool, workspacePath) {
	// Define an array of commands with their corresponding button IDs, labels, and actions
	const commands = [
		{
			id: 'drush-clear-cache',
			label: 'Clear Cache',
			icon: activeTool,
			action: async () => {
				await executeCommand('Drupal Clear Cache', executeClearCacheCommand, activeTool, workspacePath);
			},
			active: true // Always active for Drupal cache clear
		},
		// You can add more commands here, like 'drush-status' etc.
		// Note :- Don't forget to add the corresponding command in package.json with keybinds.
		{
			id: 'civicrm-clear-cache',
			label: 'CiviCRM Clear Cache',
			icon: 'civicrm',
			action: async () => {
				await executeCommand('CiviCRM Clear Cache', executeCivicrmClearCacheCommand, activeTool, workspacePath);
			},
			active: false // Initially inactive; dynamically updated
		},
	];

	// Register each button
	commands.forEach(async command => {
		if (command.id === 'civicrm-clear-cache') {
			try {
				// Dynamically check if CiviCRM is active
				await isCivicrmActiveCommand(activeTool, workspacePath);
				command.active = true; // Enable the button if the command resolves
			} catch (error) {
				command.active = false; // Keep the button inactive if the command rejects
			}
		}

		if (command.active) {
			const extStatusBarItem = createStatusBarItem(command.icon, command.id, command.label);

			// Register the command that will be executed when the status bar button is clicked
			const disposable = vscode.commands.registerCommand(command.id, async () => {
				// Set the status bar to show spinning icon
				extStatusBarItem.text = '$(sync~spin) Clearing...';
				extStatusBarItem.tooltip = `Executing ${command.label}`;
				const activeToolIcon = `$(${command.icon}-icon)`;

				try {
					// Execute the corresponding action
					await command.action();

					// Update the status bar and show a success message after execution
					extStatusBarItem.text = `${activeToolIcon} ${command.label}`;
					extStatusBarItem.tooltip = `${activeTool} is present`;
				} catch (error) {
					// Update the status bar and show an error message if the command fails
					extStatusBarItem.text = `${activeToolIcon} ${command.label}`;
					extStatusBarItem.tooltip = `${activeTool} is present`;
					vscode.window.showErrorMessage(`Failed to execute ${command.label}: ${error.message}`);
				}
			});

			// Add the disposable to the context to ensure cleanup
			context.subscriptions.push(disposable);

			// Make sure the status bar item is properly registered and visible
			context.subscriptions.push(extStatusBarItem);
		}
	});
}

/**
 * Helper function to execute a command and track execution time.
 * @param {string} commandName - The command name to display in messages
 * @param {Function} executeCommandFunction - The function to execute (e.g., executeClearCacheCommand)
 * @param {string} activeTool - The active tool
 * @param {string} workspacePath - The workspace path
 */
async function executeCommand(commandName, executeCommandFunction, activeTool, workspacePath) {
	// Record the start time
	const startTime = performance.now();

	try {
		// Execute the command and wait for it to complete
		const output = await executeCommandFunction(activeTool, workspacePath);

		// Record the end time
		const endTime = performance.now();
		const executionTime = ((endTime - startTime) / 1000).toFixed(2);

		// Show the output with the execution time
		vscode.window.showInformationMessage(`${executionTime}s: ${output}`);
	} catch (error) {
		// Show an error message with execution time
		vscode.window.showErrorMessage(`Failed to execute ${commandName} : ${error}.`);
	}
}

module.exports = { registerButtons };
