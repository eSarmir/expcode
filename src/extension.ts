import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerEvents } from './events';
import { getLanguageLevels } from './extensionState';
import { ExpcodeTreeDataProvider } from './expcodeTreeDataProvider';
import { ExpcodeViewContainerId } from './constants';

export async function activate(context: vscode.ExtensionContext) {
	
	const languageLevels = getLanguageLevels(context);
	
	const dataProvider = new ExpcodeTreeDataProvider(languageLevels);
	
	vscode.window.registerTreeDataProvider(
		ExpcodeViewContainerId, 
		dataProvider
	);

	registerEvents(context, languageLevels);

	context.subscriptions.push(
		...registerCommands(languageLevels)
	);
}

export function deactivate() {}
