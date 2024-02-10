import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function registerCommands(languageCountes: LanguageLevel[]) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(showLanguageOfActiveEditor());

    disposables.push(showNumberOfChangesForLanguage(languageCountes));

    return disposables;
}

function showLanguageOfActiveEditor(): vscode.Disposable {
    return vscode.commands.registerCommand('expcode.showLanguageOfActiveEditor', () => {
		
        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;

        vscode.window.showInformationMessage(`Current Language: ${currentLanguage}`);
    });
}

function showNumberOfChangesForLanguage(languageCountes: LanguageLevel[]) {
    return vscode.commands.registerCommand('expcode.showLevelForLanguage', () => {

        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageLevel = languageCountes.find(
			(languageCount) => languageCount.getLanguageId() === currentLanguage);

        if (languageLevel === undefined) {
            return;
        }

        vscode.window.showInformationMessage(
            languageLevel.stringify()
        );
    });
}

