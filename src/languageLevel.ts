export class LanguageLevel {

    public languageId: string;
    public level: number;
    private experience: number;

    constructor(languageId: string) {
        this.languageId = languageId;
        this.level = 1;
        this.experience = 0;
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
}