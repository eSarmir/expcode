import * as assert from 'assert';
import { TextDocumentChange } from '../textDocumentChange';
import { ExperienceCalculator } from '../experienceCalculator';

suite('Experience Calculator Test Suite', () => {
    
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

    test('Should gain two exp for more then 2 letters', () => {
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

    test('Should gain one exp for one letter after two changes in less than 1 second', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange1: TextDocumentChange = {
            text: 'a',
            receivedAt: 0
        };

        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: 1000
        };

        const expected = 1;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        const actual = experienceCalculator.calculate(documentChange2);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain two exp for one letter after three changes in less than 1 second', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();

        const documentChange1: TextDocumentChange = {
            text: 'a',
            receivedAt: 0
        };

        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: 1000
        };

        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 2000
        };

        const expected = 2;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        const actual = experienceCalculator.calculate(documentChange3);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain one exp after multiplier reset', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        const documentChange1: TextDocumentChange = {
            text: 'a',
            receivedAt: 0
        };
        
        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: 1000
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 2001
        };
        
        const expected = 1;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        const actual = experienceCalculator.calculate(documentChange3);
        
        // Assert
        assert.strictEqual(actual, expected);
    });
    
    test('Should gain three exp for one letter after four changes in less than 1 second', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        const documentChange1: TextDocumentChange = {
            text: 'a',
            receivedAt: 0
        };
        
        const documentChange2: TextDocumentChange = {
            text: 'b',
            receivedAt: 1000
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 2000
        };
        
        const documentChange4: TextDocumentChange = {
            text: 'd',
            receivedAt: 3000
        };
        
        const expected = 3;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        const actual = experienceCalculator.calculate(documentChange4);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain four exp for two letter text change combo', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        const documentChange1: TextDocumentChange = {
            text: 'ab',
            receivedAt: 0
        };
        
        const documentChange2: TextDocumentChange = {
            text: 'cd',
            receivedAt: 1000
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'cd',
            receivedAt: 2000
        };

        const expected = 4;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        const actual = experienceCalculator.calculate(documentChange3);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain four exp for more than two letter text change combo', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        const documentChange1: TextDocumentChange = {
            text: 'abc',
            receivedAt: 0
        };
        
        const documentChange2: TextDocumentChange = {
            text: 'def',
            receivedAt: 1000
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'ghi',
            receivedAt: 2000
        };

        const expected = 4;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        const actual = experienceCalculator.calculate(documentChange3);
        
        // Assert
        assert.strictEqual(actual, expected);
    });
});