import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function registerCommands(languageLevels: LanguageLevel[]) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(showLanguageOfActiveEditor());

    disposables.push(showNumberOfChangesForLanguage(languageLevels));

    return disposables;
}

function showLanguageOfActiveEditor(): vscode.Disposable {
    return vscode.commands.registerCommand('expcode.showLanguageOfActiveEditor', () => {
		
        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;

        vscode.window.showInformationMessage(`Current Language: ${currentLanguage}`);
    });
}

function showNumberOfChangesForLanguage(languageLevels: LanguageLevel[]) {
    return vscode.commands.registerCommand('expcode.showLevelForLanguage', () => {

        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;
	
		let languageLevel = languageLevels.find(
			(languageLevel) => languageLevel.getLanguageId() === currentLanguage);

        if (languageLevel === undefined) {
            return;
        }

        vscode.window.showInformationMessage(
            languageLevel.stringify()
        );
    });
}

