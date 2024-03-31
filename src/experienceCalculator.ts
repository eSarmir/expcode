import { TextDocumentChange, TextDocumentChangeStack } from "./textDocumentChange";

export class ExperienceCalculator {
    private textDocumentChangeStack: TextDocumentChangeStack = new TextDocumentChangeStack();
    private readonly maxTimeBetweenChangesMs: number = 1000;
    private multiplier: number = 1;

    public calculate(documentChange: TextDocumentChange): number {

        if (this.exceedsMaxTimeBetweenChanges(documentChange)) {
            this.textDocumentChangeStack.clear();
            this.multiplier = 1;
        }
        else {
            this.textDocumentChangeStack.push(documentChange);
        }

        if (this.textDocumentChangeStack.count >= 3) {
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
        return text.length > 1 
            ? 2
            : text.length;
    }
}