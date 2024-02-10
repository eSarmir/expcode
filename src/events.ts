import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function registerEvents(languageCountes: LanguageLevel[]) {

    registerOnDidChangeTextDocument(languageCountes);
}

function registerOnDidChangeTextDocument(languageLevels: LanguageLevel[]) {
    vscode.workspace.onDidChangeTextDocument((event) => {
	
		let languageLevel = languageLevels.find(
			(languageLevel) => languageLevel.getLanguageId() === event.document.languageId);

		if (languageLevel === undefined) {
			return;
		}

		languageLevel.gainExp(event.contentChanges.length);

		vscode.window.showInformationMessage(
            languageLevel.stringify()
        );
	});
}