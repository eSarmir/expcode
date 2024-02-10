import * as vscode from 'vscode';
import { LanguageCount } from './language-count';
import { CustomDataProvider } from './expcode-data-provider';

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "expcode" is now active!');
	
	const dataProvider = new CustomDataProvider();
	vscode.window.registerTreeDataProvider('expcode', dataProvider);

	const languages = await vscode.languages.getLanguages();

	const languageCountes = languages.map((language) => {
		return { language: language, count: 0 } as LanguageCount;
	});

	vscode.workspace.onDidChangeTextDocument((event) => {

		let languageChange = getLanguageCount(languageCountes);

		if (languageChange === undefined) {
			return;
		}

		languageChange.count++;
	});

	let getCurrectLanguageDisposable = vscode.commands.registerCommand('expcode.getLanguageId', () => {
		
		let currentLanguage = vscode.window.activeTextEditor?.document.languageId;

		vscode.window.showInformationMessage(`Current Language: ${currentLanguage}`);
	});

	let getNumberOfChangesForLanguageDisposable = vscode.commands.registerCommand('expcode.getNumberOfChangesForLanguage', () => {

		let languageChange = getLanguageCount(languageCountes);

		if (languageChange === undefined) {
			return;
		}

		vscode.window.showInformationMessage(
			`${languageChange.language} changes: ${languageChange.count}`
		);
	});

	context.subscriptions.push(
		getCurrectLanguageDisposable, 
		getNumberOfChangesForLanguageDisposable
	);
}

function getLanguageCount(languageCount: LanguageCount[]) {
	
	let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
	return languageCount.find(
		(languageChange) => languageChange.language === currentLanguage);
}

export function deactivate() {}
