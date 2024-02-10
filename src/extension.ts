import * as vscode from 'vscode';
import { LanguageCount } from './languageCount';
import { CustomDataProvider } from './expcodeDataProvider';
import { registerCommands } from './commands';

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "expcode" is now active!');
	
	const dataProvider = new CustomDataProvider();
	vscode.window.registerTreeDataProvider('expcode', dataProvider);

	const languages = await vscode.languages.getLanguages();

	const languageCountes = languages.map((language) => {
		return { language: language, count: 0 } as LanguageCount;
	});

	vscode.workspace.onDidChangeTextDocument((event) => {

		let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageChange = languageCountes.find(
			(languageCount) => languageCount.language === currentLanguage);

		if (languageChange === undefined) {
			return;
		}

		languageChange.count++;
	});

	context.subscriptions.push(
		...registerCommands(languageCountes)
	);
}

export function deactivate() {}
