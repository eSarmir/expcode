import * as vscode from 'vscode';
import { LanguageCount } from './languageCount';

export function registerEvents(languageCountes: LanguageCount[]) {

    onDidChangeTextDocument(languageCountes);
}

function onDidChangeTextDocument(languageCountes: LanguageCount[]) {
    vscode.workspace.onDidChangeTextDocument((event) => {

		let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageChange = languageCountes.find(
			(languageCount) => languageCount.language === currentLanguage);

		if (languageChange === undefined) {
			return;
		}

		languageChange.count++;
	});
}