import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerEvents } from './events';
import { getLanguageLevels } from './extensionState';
import { ExpcodeDataProvider } from './expcodeDataProvider';

export async function activate(context: vscode.ExtensionContext) {

	const dataProvider = new ExpcodeDataProvider();
	vscode.window.registerTreeDataProvider('expcode', dataProvider);

	const languageLevels = getLanguageLevels(context);

	registerEvents(context, languageLevels);

	context.subscriptions.push(
		...registerCommands(languageLevels)
	);
}

export function deactivate() {}
