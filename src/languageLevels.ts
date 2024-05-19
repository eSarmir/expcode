import { LanguageLevel } from "./languageLevel";

export class LanguageLevels {
    private languageLevels: LanguageLevel[];

    constructor(languageLevels: LanguageLevel[] = []) {
        this.languageLevels = languageLevels;

        var overallLanguageLevel = this.languageLevels.find((languageLevel) => languageLevel.getLanguageId() === 'overall');
    
        if (overallLanguageLevel === undefined) 
        {
            this.addOverallLevel();
        }
    }

    public getLanguageLevels(): LanguageLevel[] {
        return this.languageLevels;
    }

    public getLanguageLevel(languageId: string): LanguageLevel | undefined {
        return this.languageLevels.find((languageLevel) => languageLevel.getLanguageId() === languageId);
    }

    public addLanguageLevel(languageLevel: LanguageLevel) {
        this.languageLevels.push(languageLevel);
    }

    public updateLanguageLevel(languageLevel: LanguageLevel) {
        const index = this.languageLevels.findIndex((level) => level.getLanguageId() === languageLevel.getLanguageId());
        this.languageLevels[index] = languageLevel;
    }

    public deleteLanguageLevel(languageId: string) {
        const index = this.languageLevels.findIndex((level) => level.getLanguageId() === languageId);
        this.languageLevels.splice(index, 1);
    }

    public resetLanguageLevels() {
        this.languageLevels = [];
        this.addOverallLevel();
    }

    private addOverallLevel() {
        this.languageLevels.unshift(new LanguageLevel('overall'));
    }
}