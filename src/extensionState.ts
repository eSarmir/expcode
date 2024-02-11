import * as vscode from 'vscode';
import { LanguageLevel, StorableLanguageLevel } from './languageLevel';

export function getLanguageLevels(context: vscode.ExtensionContext): LanguageLevel[] {
    var languageLevels = context.globalState.get<StorableLanguageLevel[]>(`expcode-languageLevels`, [] as StorableLanguageLevel[]);

    return languageLevels.map((languageLevel) => {
        return new LanguageLevel(
            languageLevel.languageId, 
            languageLevel.level,
            languageLevel.experience,
            languageLevel.expToNextLevel
            );
    });
}

export function updateLanguageLevels(context: vscode.ExtensionContext, languageLevels: LanguageLevel[]) {
    
    let languageLevelsToStore = languageLevels.map((languageLevel) => {
        return {
            languageId: languageLevel.getLanguageId(),
            level: languageLevel.getLevel(),
            experience: languageLevel.getExperience(),
            expToNextLevel: languageLevel.getExpToNextLevel()
        } as StorableLanguageLevel;
    });
    
    context.globalState.update(`expcode-languageLevels`, languageLevelsToStore);
}