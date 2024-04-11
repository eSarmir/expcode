import * as assert from 'assert';
import { TextDocumentChange } from '../textDocumentChange';
import { ExperienceCalculator } from '../experienceCalculator';

suite('Experience Calculator Test Suite', () => {
    
    const maxTimeBetweenChangesMs: number = 3000;

    test('Should gain one exp for one letter', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'a',
            receivedAt: Date.now()
        };

        const expected = 1;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain zero exp for empty string', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: '',
            receivedAt: Date.now()
        };

        const expected = 0;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain zero exp for single whitespace character', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: ' ',
            receivedAt: Date.now()
        };

        const expected = 0;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain zero exp for multiple whitespace characters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: '     ',
            receivedAt: Date.now()
        };

        const expected = 0;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain two exp for two letters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'ab',
            receivedAt: Date.now()
        };

        const expected = 2;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain two exp for 3 letters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'abc',
            receivedAt: Date.now()
        };

        const expected = 2;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain three exp for 11 letters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'abcdefghijk',
            receivedAt: Date.now()
        };

        const expected = 3;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain eleven exp for 91 letters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'abcdefghij'.repeat(9) + 'a',
            receivedAt: Date.now()
        };

        const expected = 11;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain twelve exp for 101 letters', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange: TextDocumentChange = {
            text: 'abcdefghij'.repeat(10) + 'a',
            receivedAt: Date.now()
        };

        const expected = 12;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain one exp for one letter after two changes in less than 1 second', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange1: TextDocumentChange = {
            text: 'a',
            receivedAt: 0
        };

        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: 500
        };

        const expected = 1;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        const actual = experienceCalculator.calculate(documentChange2);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain one exp for one letter after first combo stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const firstComboStack: TextDocumentChange = {
            text: 'aa',
            receivedAt: 0
        };

        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: maxTimeBetweenChangesMs
        };

        const expected = 1;
        
        // Act
        experienceCalculator.calculate(firstComboStack);
        const actual = experienceCalculator.calculate(documentChange2);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain two exp for two letters after second combo stack
    test('Should gain two exp for one letter after second combo stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const firstComboStack: TextDocumentChange = {
            text: 'aa',
            receivedAt: 0
        };

        const secondComboStack: TextDocumentChange = {
            text: 'bb',
            receivedAt: maxTimeBetweenChangesMs
        };

        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: maxTimeBetweenChangesMs * 2
        };

        const expected = 2;
        
        // Act
        experienceCalculator.calculate(firstComboStack);
        experienceCalculator.calculate(secondComboStack);
        const actual = experienceCalculator.calculate(documentChange3);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain three exp for one letter after third combo stack
    test('Should gain three exp for one letter after third combo stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const firstComboStack: TextDocumentChange = {
            text: 'aa',
            receivedAt: 0
        };

        const secondComboStack: TextDocumentChange = {
            text: 'bb',
            receivedAt: maxTimeBetweenChangesMs
        };

        const thirdComboStack: TextDocumentChange = {
            text: 'cc',
            receivedAt: maxTimeBetweenChangesMs * 2
        };

        const documentChange4: TextDocumentChange = {
            text: 'd',
            receivedAt: maxTimeBetweenChangesMs * 3
        };

        const expected = 3;
        
        // Act
        experienceCalculator.calculate(firstComboStack);
        experienceCalculator.calculate(secondComboStack);
        experienceCalculator.calculate(thirdComboStack);
        const actual = experienceCalculator.calculate(documentChange4);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain ten exp for one letter after tenth stack 
    test('Should gain ten exp for one letter after tenth stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        for (let i = 0; i < 10; i++) {
            const comboStackChange: TextDocumentChange = {
                text: 'aa',
                receivedAt: maxTimeBetweenChangesMs * i
            };    

            experienceCalculator.calculate(comboStackChange);
        }
        
        const documentChange: TextDocumentChange = {
            text: 'a',
            receivedAt: maxTimeBetweenChangesMs * 10
        };

        const expected = 10;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain ten exp for one letter after eleventh stack (max combo)
    test('Should gain ten exp for one letter after eleventh stack (max combo)', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        for (let i = 0; i < 11; i++) {
            const comboStackChange: TextDocumentChange = {
                text: 'aa',
                receivedAt: maxTimeBetweenChangesMs * i
            };    

            experienceCalculator.calculate(comboStackChange);
        }
        
        const documentChange: TextDocumentChange = {
            text: 'a',
            receivedAt: maxTimeBetweenChangesMs * 11
        };

        const expected = 10;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain 10 exp for 100 letters after first stack
    test('Should gain 22 exp for 100 letters for second stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const comboStackChange: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: 0
        };

        const documentChange: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: maxTimeBetweenChangesMs
        };

        const expected = 22;
        
        // Act
        experienceCalculator.calculate(comboStackChange);
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain 10 exp for 100 letters after second stack
    test('Should gain 33 exp for 100 letters for third stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const firstComboStack: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: 0
        };

        const secondComboStack: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: maxTimeBetweenChangesMs
        };

        const documentChange: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: maxTimeBetweenChangesMs * 2
        };

        const expected = 33;
        
        // Act
        experienceCalculator.calculate(firstComboStack);
        experienceCalculator.calculate(secondComboStack);
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    // Should gain 100 exp for 100 letters after tenth stack
    test('Should gain 110 exp for 100 letters after tenth stack', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        for (let i = 0; i < 10; i++) {
            const comboStackChange: TextDocumentChange = {
                text: 'a'.repeat(100),
                receivedAt: maxTimeBetweenChangesMs * i
            };    

            experienceCalculator.calculate(comboStackChange);
        }
        
        const documentChange: TextDocumentChange = {
            text: 'a'.repeat(100),
            receivedAt: maxTimeBetweenChangesMs * 10
        };

        const expected = 110;
        
        // Act
        const actual = experienceCalculator.calculate(documentChange);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain one exp after reseting two change combo', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const firstComboStack: TextDocumentChange = {
            text: 'aa',
            receivedAt: 0
        };

        const secondComboStack: TextDocumentChange = {
            text: 'bb',
            receivedAt: maxTimeBetweenChangesMs
        };

        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: maxTimeBetweenChangesMs * 5
        };

        const expected = 1;
        
        // Act
        experienceCalculator.calculate(firstComboStack);
        experienceCalculator.calculate(secondComboStack);
        const actual = experienceCalculator.calculate(documentChange3);

        // Assert
        assert.strictEqual(actual, expected);
    });
});