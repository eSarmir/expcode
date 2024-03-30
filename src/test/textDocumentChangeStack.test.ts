import * as assert from 'assert';
import { TextDocumentChange } from '../textDocumentChange';
import { TextDocumentChangeStack } from '../textDocumentChange';

suite('TextDocumentChangeStack Test Suite', () => {

    test('Add event to empty stack', () => {
        // arrange
        const stack = new TextDocumentChangeStack();
        
        const changeEvent: TextDocumentChange = {
            text: 'a',
            receivedAt: new Date()
        };

        // act
        stack.push(changeEvent);

        // assert
        assert.strictEqual(stack.getItems.length, 1);
        assert.strictEqual(stack.getItems[0].text, changeEvent.text);
        assert.strictEqual(stack.getItems[0].receivedAt, changeEvent.receivedAt);
    });

    test('Reaching max events in stack should remove the first one', () => {
        // arrange
        const stack = new TextDocumentChangeStack();

        // act
        for (let i = 0; i < 11; i++) {
            const changeEvent: TextDocumentChange = {
                text: i.toString(),
                receivedAt: new Date()
            };

            stack.push(changeEvent);
        }

        // assert
        assert.strictEqual(stack.getItems.length, 10);
        assert.strictEqual(stack.getItems[0].text, '1');
        assert.strictEqual(stack.getItems[9].text, '10');
    });
});