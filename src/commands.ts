import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { 
    ResetProgressCommand,
    ShowLanguageOfActiveEditorCommand, 
    ShowLevelForLanguageCommand 
} from './constants';
import { resetLanguageLevels } from './extensionState';

export function registerCommands(
    languageLevels: LanguageLevel[],
    context: vscode.ExtensionContext) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(showLanguageOfActiveEditor());

    disposables.push(showLevelForLanguage(languageLevels));

    disposables.push(resetProgress(context, languageLevels));

    return disposables;
}

function showLanguageOfActiveEditor(): vscode.Disposable {
    return vscode.commands.registerCommand(ShowLanguageOfActiveEditorCommand, () => {
		
        let currentLanguage = vscode.window.activeTextEditor?.document.languageId;

        vscode.window.showInformationMessage(`Current Language: ${currentLanguage}`);
    });
}

function showLevelForLanguage(languageLevels: LanguageLevel[]) {
    return vscode.commands.registerCommand(ShowLevelForLanguageCommand, () => {

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

function resetProgress(
    context: vscode.ExtensionContext,
    languageLevels: LanguageLevel[]) {

    return vscode.commands.registerCommand(ResetProgressCommand, () => {
        languageLevels = [];
        resetLanguageLevels(context);
    });
};