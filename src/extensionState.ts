import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export function getLanguageLevels(context: vscode.ExtensionContext): LanguageLevel[] {
    return context.globalState.get<LanguageLevel[]>(`expcode-languageLevels`, []);
}

export function updateLanguageLevels(context: vscode.ExtensionContext, languageLevels: LanguageLevel[]) {
    context.globalState.update(`expcode-languageLevels`, languageLevels);
}