import * as vscode from 'vscode';
import { LanguageCount } from './languageCount';

export function registerCommands(languageCountes: LanguageCount[]) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(showLanguageOfActiveEditor());

    disposables.push(showNumberOfChangesForLanguage(languageCountes));

    return disposables;
}

function showLanguageOfActiveEditor(): vscode.Disposable {
    return vscode.commands.registerCommand('expcode.getLanguageId', () => {
		
        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;

        vscode.window.showInformationMessage(`Current Language: ${currentLanguage}`);
    });
}

function showNumberOfChangesForLanguage(languageCountes: LanguageCount[]) {
    return vscode.commands.registerCommand('expcode.getNumberOfChangesForLanguage', () => {

        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageChange = languageCountes.find(
			(languageCount) => languageCount.language === currentLanguage);

        if (languageChange === undefined) {
            return;
        }

        vscode.window.showInformationMessage(
            `${languageChange.language} changes: ${languageChange.count}`
        );
    });
}

