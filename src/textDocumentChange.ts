export interface TextDocumentChange {
    text: string;
    receivedAt: number;
}

export class TextDocumentChangeStack {
    private stack: TextDocumentChange[] = [];
    private readonly maxStackSize: number = 10;

    public get count(): number {
        return this.stack.length;
    }

    public getItemAt(index: number): TextDocumentChange {

        if (index < 0 || index >= this.stack.length) {
            throw new Error('Index out of bounds');
        }
        
        return this.stack[index];
    }

    public clear() {
        this.stack = [];
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