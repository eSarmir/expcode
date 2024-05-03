import * as vscode from 'vscode';
import { LanguageLevel, StorableLanguageLevel } from './languageLevel';
import { LanguageLevelsGlobalStateId } from './constants'; 
import { LanguageLevels } from './languageLevels';

export function getLanguageLevels(context: vscode.ExtensionContext): LanguageLevels {
    var storableLanguageLevels = context.globalState.get<StorableLanguageLevel[]>(
        LanguageLevelsGlobalStateId, [] as StorableLanguageLevel[]
    );

    var languageLevels = storableLanguageLevels.map((languageLevel) => {
        return new LanguageLevel(
            languageLevel.languageId, 
            languageLevel.level,
            languageLevel.experience,
            );
    });

    return new LanguageLevels(languageLevels);
}

export function updateLanguageLevels(context: vscode.ExtensionContext, languageLevels: LanguageLevels) {
    
    let languageLevelsToStore = languageLevels.getLanguageLevels().map((languageLevel) => {
        return {
            languageId: languageLevel.getLanguageId(),
            level: languageLevel.getLevel(),
            experience: languageLevel.getExperience(),
        } as StorableLanguageLevel;
    });
    
    context.globalState.update(LanguageLevelsGlobalStateId, languageLevelsToStore);
}

export function deleteStoredLanguageLevels(context: vscode.ExtensionContext) {
    context.globalState.update(LanguageLevelsGlobalStateId, undefined);
}