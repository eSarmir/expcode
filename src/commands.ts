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

    disposables.push(resetProgress(context, languageLevels));

    return disposables;
}

function resetProgress(
    context: vscode.ExtensionContext,
    languageLevels: LanguageLevel[]) {

    return vscode.commands.registerCommand(ResetProgressCommand, () => {
        languageLevels = [];
        resetLanguageLevels(context);
    });
};