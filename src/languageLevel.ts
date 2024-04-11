export interface StorableLanguageLevel {
    languageId: string;
    level: number;
    experience: number;
}

export class LanguageLevel {

    private languageId: string;
    private level: number;
    private experience: number;
    private nextLevelExpTreshold: number;

    private readonly defaultLevel = 1;
    private readonly defaultExperience = 0;

    private readonly expPerLevel = 256;

    constructor(
        languageId: string,
        level?: number, 
        experience?: number) {
    
        this.languageId = languageId;
        this.level = level || this.defaultLevel;
        this.experience = experience || this.defaultExperience;
        this.nextLevelExpTreshold = this.calculateExpToNextLevel(this.level);
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

    public getNextLevelExpTreshold(): number {
        return this.nextLevelExpTreshold;
    }

    public gainExp(exp: number): boolean {
        
        this.experience += exp;

        if (this.experience >= this.nextLevelExpTreshold) {
            this.levelUp();   
            return true;
        }

        return false;
    }

    private levelUp() {
        this.level++;
        this.experience = this.experience - this.nextLevelExpTreshold;
        this.nextLevelExpTreshold = this.calculateExpToNextLevel(this.level);
    }

    private calculateExpToNextLevel(currentLevel: number) {
        return currentLevel * 256;
    }

    public calculateProgress(): number {
        return this.experience / this.nextLevelExpTreshold * 100;
    }

    public stringify(): string {
        return `Language: ${this.languageId} Level: ${this.level} Experience: ${this.experience}`;
    }
}