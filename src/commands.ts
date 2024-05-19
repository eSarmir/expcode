import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { RemoveLanguageCommand, ResetProgressCommand } from './constants';
import { deleteStoredLanguageLevels, updateLanguageLevels } from './extensionState';
import { LanguageLevels } from './languageLevels';

export function registerCommands(
    languageLevels: LanguageLevels,
    context: vscode.ExtensionContext,
    treeViewDataRefreshCallback: () => void) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(resetProgress(context, languageLevels, treeViewDataRefreshCallback));
    disposables.push(removeLanguage(context, languageLevels, treeViewDataRefreshCallback));

    return disposables;
}

function resetProgress(
    context: vscode.ExtensionContext,
    languageLevels: LanguageLevels,
    treeViewDataRefreshCallback: () => void) {

    return vscode.commands.registerCommand(ResetProgressCommand, () => {
        languageLevels.resetLanguageLevels();
        deleteStoredLanguageLevels(context);
        treeViewDataRefreshCallback();
    });
};

function removeLanguage(
    context: vscode.ExtensionContext,
    languageLevels: LanguageLevels,
    treeViewDataRefreshCallback: () => void) {

    return vscode.commands.registerCommand(RemoveLanguageCommand, (treeViewItem) => {
        
        if (treeViewItem === undefined || treeViewItem.LanguageLevel === undefined) {
            return;
        }
        
        const languageId = treeViewItem.LanguageLevel.getLanguageId();

        languageLevels.deleteLanguageLevel(languageId);
        updateLanguageLevels(context, languageLevels);
        treeViewDataRefreshCallback();
    });
}