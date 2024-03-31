import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerEvents } from './events';
import { getLanguageLevels } from './extensionState';
import { ExpcodeTreeDataProvider } from './expcodeTreeDataProvider';
import { ExpcodeViewContainerId } from './constants';
import { ExperienceCalculator } from './experienceCalculator';

export async function activate(context: vscode.ExtensionContext) {
	
	const languageLevels = getLanguageLevels(context);
	
	const dataProvider = new ExpcodeTreeDataProvider(languageLevels);

	const experienceCalculator = new ExperienceCalculator();

	vscode.window.registerTreeDataProvider(
		ExpcodeViewContainerId,
		dataProvider
	);

	registerEvents(
		context, 
		languageLevels,
		experienceCalculator, 
		dataProvider.refresh.bind(dataProvider));

	context.subscriptions.push(
		...registerCommands(languageLevels)
	);
}

export function deactivate() {}
