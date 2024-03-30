export interface TextDocumentChange {
    text: string;
    receivedAt: Date;
}

export class TextDocumentChangeStack {
    private stack: TextDocumentChange[] = [];
    private readonly maxStackSize: number = 10;

    public get getItems(): TextDocumentChange[] {
        return this.stack;
    }

    public push(event: TextDocumentChange) {
        if (this.stackIsFull()) {
            this.removeFirstEvent();
        }

        this.stack.push(event);
    }

    private stackIsFull(): boolean {
        return this.stack.length === this.maxStackSize;
    }

    private removeFirstEvent() {
        this.stack.shift();
    }
}