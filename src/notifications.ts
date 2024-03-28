import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function showLanguageLevelUpNotification(toUpdate: LanguageLevel) {
    var shouldShowNotification = vscode.workspace.getConfiguration("expcode").get("showLanguageLevelUpNotification");

    if (shouldShowNotification) {
        vscode.window.showInformationMessage(
            `Congratulations! You have reached level ${toUpdate.getLevel()} in ${toUpdate.getLanguageId()}!`
        );
    }
}