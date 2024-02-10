import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { ExpcodeDataProvider } from './expcodeDataProvider';
import { registerCommands } from './commands';
import { registerEvents } from './events';

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "expcode" is now active!');
	
	const dataProvider = new ExpcodeDataProvider();
	vscode.window.registerTreeDataProvider('expcode', dataProvider);

	const languages = await vscode.languages.getLanguages();

	const languageLevels = languages.map((language) => {
		return new LanguageLevel(language);
	});

	registerEvents(languageLevels);

	context.subscriptions.push(
		...registerCommands(languageLevels)
	);
}

export function deactivate() {}
