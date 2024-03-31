import { TextDocumentChange, TextDocumentChangeStack } from "./textDocumentChange";

export class ExperienceCalculator {
    private readonly textDocumentChangeStack: TextDocumentChangeStack = new TextDocumentChangeStack();
    private readonly maxTimeBetweenChangesMs: number = 1000;
    private readonly stackSizeToStartCombo: number = 3;
    private multiplier: number = 1;

    private readonly singleCharacterExperience: number = 1;
    private readonly multiCharacterExperience: number = 2;

    public calculate(documentChange: TextDocumentChange): number {

        if (this.exceedsMaxTimeBetweenChanges(documentChange)) {
            this.textDocumentChangeStack.clear();
            this.multiplier = 1;
        }
        else {
            this.textDocumentChangeStack.push(documentChange);
        }

        if (this.textDocumentChangeStack.count >= this.stackSizeToStartCombo) {
            ++this.multiplier;
        }

        return this.getBaseExperience(documentChange.text) * this.multiplier;
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