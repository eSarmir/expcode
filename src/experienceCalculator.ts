import { TextDocumentChange, TextDocumentChangeStack } from "./textDocumentChange";

export class ExperienceCalculator {
    private readonly textDocumentChangeStack: TextDocumentChangeStack = new TextDocumentChangeStack();
    private readonly maxTimeBetweenChangesMs: number = 500;
    private readonly stackSizeToStartCombo: number = 3;

    private readonly singleCharacterExperience: number = 1;
    private readonly multiCharacterExperience: number = 2;

    public calculate(documentChange: TextDocumentChange): number {

        if (this.exceedsMaxTimeBetweenChanges(documentChange)) {
            this.textDocumentChangeStack.clear();
        }
        else {
            this.textDocumentChangeStack.push(documentChange);
        }

        return this.getBaseExperience(documentChange.text) * this.getMultiplier();
    }

    private getMultiplier() {
        if (this.textDocumentChangeStack.count <= this.stackSizeToStartCombo) {
            return 1;
        }

        // Max multiplier is 8 (depends on the maxStackSize which is 10)
        return 1 + this.textDocumentChangeStack.count - this.stackSizeToStartCombo;
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
            ? this.multiCharacterExperience
            : this.singleCharacterExperience;
    }
}