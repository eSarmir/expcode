import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import { ResetProgressCommand } from './constants';
import { deleteStoredLanguageLevels } from './extensionState';
import { LanguageLevels } from './languageLevels';

export function registerCommands(
    languageLevels: LanguageLevels,
    context: vscode.ExtensionContext,
    treeViewDataRefreshCallback: () => void) {

    const disposables: vscode.Disposable[] = [];

    disposables.push(resetProgress(context, languageLevels, treeViewDataRefreshCallback));

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