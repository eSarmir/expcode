export class LanguageLevel {

    private languageId: string;
    private level: number;
    private experience: number;

    constructor(languageId: string) {
        this.languageId = languageId;
        this.level = 1;
        this.experience = 0;
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

        if (this.experience >= 100) {
            this.levelUp();
        }
    }

    private levelUp() {
        this.level++;
        this.experience = 0;
    }

    public stringify(): string {
        return `Language: ${this.languageId} Level: ${this.level} Experience: ${this.experience}`;
    }
}