import * as vscode from 'vscode';
import { LanguageLevel, StorableLanguageLevel } from './languageLevel';
import { LanguageLevelsGlobalStateId } from './constants'; 

export function getLanguageLevels(context: vscode.ExtensionContext): LanguageLevel[] {
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

    var overallLanguageLevel = languageLevels.find((languageLevel) => languageLevel.getLanguageId() === 'overall');

    if (overallLanguageLevel === undefined) 
    {
        overallLanguageLevel = new LanguageLevel('overall');
        languageLevels.unshift(overallLanguageLevel);
    }

    return languageLevels;
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