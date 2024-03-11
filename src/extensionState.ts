import * as vscode from 'vscode';
import { LanguageLevel, StorableLanguageLevel } from './languageLevel';
import { LanguageLevelsGlobalStateId } from './constants'; 

export function getLanguageLevels(context: vscode.ExtensionContext): LanguageLevel[] {
    var languageLevels = context.globalState.get<StorableLanguageLevel[]>(
        LanguageLevelsGlobalStateId, [] as StorableLanguageLevel[]
    );

    return languageLevels.map((languageLevel) => {
        return new LanguageLevel(
            languageLevel.languageId, 
            languageLevel.level,
            languageLevel.experience,
            );
    });
}

export function updateLanguageLevels(context: vscode.ExtensionContext, languageLevels: LanguageLevel[]) {
    
    let languageLevelsToStore = languageLevels.map((languageLevel) => {
        return {
            languageId: languageLevel.getLanguageId(),
            level: languageLevel.getLevel(),
            experience: languageLevel.getExperience(),
        } as StorableLanguageLevel;
    });
    
    context.globalState.update(LanguageLevelsGlobalStateId, languageLevelsToStore);
}

export function resetLanguageLevels(context: vscode.ExtensionContext) {
    context.globalState.update(LanguageLevelsGlobalStateId, undefined);
}