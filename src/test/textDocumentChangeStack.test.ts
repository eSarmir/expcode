import * as assert from 'assert';
import { TextDocumentChange } from '../textDocumentChange';
import { TextDocumentChangeStack } from '../textDocumentChange';

suite('TextDocumentChangeStack Test Suite', () => {

    test('Add event to empty stack', () => {
        // arrange
        const stack = new TextDocumentChangeStack();
        
        const changeEvent: TextDocumentChange = {
            text: 'a',
            receivedAt: Date.now()
        };

        // act
        stack.push(changeEvent);

        // assert
        const firstItem = stack.getItemAt(0);

        assert.strictEqual(stack.count, 1);
        assert.strictEqual(firstItem.text, changeEvent.text);
        assert.strictEqual(firstItem.receivedAt, changeEvent.receivedAt);
    });

    test('Reaching max events in stack should remove the first one', () => {
        // arrange
        const stack = new TextDocumentChangeStack();

        // act
        for (let i = 0; i < 11; i++) {
            const changeEvent: TextDocumentChange = {
                text: i.toString(),
                receivedAt: Date.now()
            };

            stack.push(changeEvent);
        }

        // assert
        const firstItem = stack.getItemAt(0);
        const lastItem = stack.getItemAt(9);

        assert.strictEqual(stack.count, 10);
        assert.strictEqual(firstItem.text, '1');
        assert.strictEqual(lastItem.text, '10');
    });

    test('Clear stack', () => {
        // arrange
        const stack = new TextDocumentChangeStack();

        const changeEvent: TextDocumentChange = {
            text: 'a',
            receivedAt: Date.now()
        };

        stack.push(changeEvent);
        
        // act
        stack.clear();

        // assert
        assert.strictEqual(stack.count, 0);
    });
});