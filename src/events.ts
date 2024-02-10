import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function registerEvents(languageCountes: LanguageLevel[]) {

    registerOnDidChangeTextDocument(languageCountes);
}

function registerOnDidChangeTextDocument(languageLevels: LanguageLevel[]) {
    vscode.workspace.onDidChangeTextDocument((event) => {

		let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageLevel = languageLevels.find(
			(languageCount) => languageCount.languageId === currentLanguage);

		if (languageLevel === undefined) {
			return;
		}

		languageLevel.gainExp(1);
	});
}