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
            receivedAt: 500
        };

        const expected = 1;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        const actual = experienceCalculator.calculate(documentChange2);

        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain two exp for one letter after four changes', () => {
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

        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 1000
        };

        const documentChange4: TextDocumentChange = {
            text: 'd',
            receivedAt: 1500
        };

        const expected = 2;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        const actual = experienceCalculator.calculate(documentChange4);

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
            receivedAt: 500
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 1000
        };

        const exceedsComboTime: TextDocumentChange = {
            text: 'd',
            receivedAt: 1501
        };
        
        const expected = 1;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        const actual = experienceCalculator.calculate(exceedsComboTime);
        
        // Assert
        assert.strictEqual(actual, expected);
    });
    
    test('Should gain three exp for one letter after five changes', () => {
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
        
        const documentChange3: TextDocumentChange = {
            text: 'c',
            receivedAt: 1000
        };
        
        const documentChange4: TextDocumentChange = {
            text: 'd',
            receivedAt: 1500
        };

        const documentChange5: TextDocumentChange = {
            text: 'e',
            receivedAt: 2000
        };
        
        const expected = 3;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        experienceCalculator.calculate(documentChange4);
        const actual = experienceCalculator.calculate(documentChange5);
        
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
            receivedAt: 500
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'ef',
            receivedAt: 1000
        };

        const documentChange4: TextDocumentChange = {
            text: 'gh',
            receivedAt: 1500
        };

        const expected = 4;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        const actual = experienceCalculator.calculate(documentChange4);
        
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
            receivedAt: 500
        };
        
        const documentChange3: TextDocumentChange = {
            text: 'ghi',
            receivedAt: 1000
        };

        const documentChange4: TextDocumentChange = {
            text: 'jkl',
            receivedAt: 1500
        };

        const expected = 4;
        
        // Act
        experienceCalculator.calculate(documentChange1);
        experienceCalculator.calculate(documentChange2);
        experienceCalculator.calculate(documentChange3);
        const actual = experienceCalculator.calculate(documentChange4);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain 7 exp for one letter after 9 changes', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        for (let i = 1; i <= 8; i++) {
            experienceCalculator.calculate({
                text: 'a',
                receivedAt: i * 500
            });
        }
        
        const ninthChange: TextDocumentChange = {
            text: 'a',
            receivedAt: 4500
        };

        const expected = 7;
        
        // Act
        const actual = experienceCalculator.calculate(ninthChange);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain 8 exp for one letter after 10 changes (max combo)', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        for (let i = 1; i <= 9; i++) {
            experienceCalculator.calculate({
                text: 'a',
                receivedAt: i * 500
            });
        }
        
        const tenthChange: TextDocumentChange = {
            text: 'a',
            receivedAt: 5000
        };

        const expected = 8;
        
        // Act
        const actual = experienceCalculator.calculate(tenthChange);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain 8 exp for one letter after 11 changes', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        for (let i = 1; i <= 10; i++) {
            experienceCalculator.calculate({
                text: 'a',
                receivedAt: i * 500
            });
        }
        
        const eleventhChange: TextDocumentChange = {
            text: 'a',
            receivedAt: 5500
        };

        const expected = 8;
        
        // Act
        const actual = experienceCalculator.calculate(eleventhChange);
        
        // Assert
        assert.strictEqual(actual, expected);
    });

    test('Should gain 16 exp for multiple letters on max combo', () => {
        // Arrange
        const experienceCalculator = new ExperienceCalculator();
        
        for (let i = 1; i <= 9; i++) {
            experienceCalculator.calculate({
                text: 'abc',
                receivedAt: i * 500
            });
        }
        
        const tenthChange: TextDocumentChange = {
            text: 'abcdefgh',
            receivedAt: 5000
        };

        const expected = 16;
        
        // Act
        const actual = experienceCalculator.calculate(tenthChange);
        
        // Assert
        assert.strictEqual(actual, expected);
    });
});