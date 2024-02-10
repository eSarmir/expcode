export class LanguageLevel {

    private languageId: string;
    private level: number;
    private experience: number;
    private expToNextLevel: number;

    constructor(languageId: string) {
        this.languageId = languageId;
        this.level = 1;
        this.experience = 0;
        this.expToNextLevel = this.calculateExpToNextLevel(this.level);
    }

    public getLanguageId() { 
        return this.languageId; 
    }

    public getLevel() { 
        return this.level; 
    }

    public getExperience() { 
        return this.experience; 
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