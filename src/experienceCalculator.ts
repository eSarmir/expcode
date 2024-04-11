import { TextDocumentChange, ComboStack } from "./textDocumentChange";

export class ExperienceCalculator {
    private readonly textDocumentChangeStack: ComboStack = new ComboStack();
    private readonly maxTimeBetweenChangesMs: number = 3000;

    private readonly singleCharacterExperience: number = 1;
    private readonly MaxMultiCharacterExperience: number = 20;

    public calculate(documentChange: TextDocumentChange): number {

        if (this.shouldAddToStack(documentChange)) {
            this.textDocumentChangeStack.push(documentChange);
        }
        else if (this.exceedsMaxTimeBetweenChanges(documentChange)) {
            this.textDocumentChangeStack.clear();
        }

        return this.getBaseExperience(documentChange.text) * this.getMultiplier();
    }
    
    private shouldAddToStack(documentChange: TextDocumentChange): boolean {
        return !this.exceedsMaxTimeBetweenChanges(documentChange) && documentChange.text.length > 1;
    }
    
    private exceedsMaxTimeBetweenChanges(documentChange: TextDocumentChange): boolean {
        return documentChange.receivedAt - this.getLastChange().receivedAt > this.maxTimeBetweenChangesMs;
    }
    
    private getLastChange(): TextDocumentChange {
        
        if (this.textDocumentChangeStack.count === 0) {
            return { text: '', receivedAt: Date.now() };
        }
        
        return this.textDocumentChangeStack.getItemAt(this.textDocumentChangeStack.count - 1);
    }
    
    private getBaseExperience(text: string): number {
        
        text = text.trim();
        
        if (text.length === 0) {
            return 0;
        }
        
        return text.length > 1 
            ? this.getExperienceForMultiCharacter(text)
            : this.singleCharacterExperience;
    }
    
    private getExperienceForMultiCharacter(text: string): number {
        return Math.min(
            this.singleCharacterExperience + Math.ceil(text.length / 10),
            this.MaxMultiCharacterExperience
            );
        }
        
    private getMultiplier() {

        if (this.textDocumentChangeStack.count === 0) {
            return 1;
        }

        return this.textDocumentChangeStack.count;
    }
}