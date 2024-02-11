export interface StorableLanguageLevel {
    languageId: string;
    level: number;
    experience: number;
    expToNextLevel: number;
}

export class LanguageLevel {

    private languageId: string;
    private level: number;
    private experience: number;
    private expToNextLevel: number;

    constructor(
        languageId: string,
        level?: number, 
        experience?: number,
        expToNextLevel?: number) {
    
        this.languageId = languageId;
        this.level = level || 1;
        this.experience = experience || 0;
        this.expToNextLevel = expToNextLevel || this.calculateExpToNextLevel(this.level);
    }

    public getLanguageId(): string { 
        return this.languageId; 
    }

    public getLevel(): number { 
        return this.level; 
    }

    public getExperience(): number { 
        return this.experience; 
    }

    public getExpToNextLevel(): number { 
        return this.expToNextLevel; 
    }

    public gainExp(exp: number) {
        
        this.experience += exp;

        if (this.experience >= this.expToNextLevel) {
            this.levelUp();   
        }
    }

    private levelUp() {
        this.level++;
        this.experience = this.experience - this.expToNextLevel;
        this.expToNextLevel = this.calculateExpToNextLevel(this.level);
    }

    private calculateExpToNextLevel(currentLevel: number) {
        return currentLevel * 100;
    }

    public stringify(): string {
        return `Language: ${this.languageId} Level: ${this.level} Experience: ${this.experience}`;
    }
}