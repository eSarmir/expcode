import * as assert from 'assert';
import { LanguageLevel } from '../languageLevel';

suite('LanguageLevel Test Suite', () => {
    
    test('New LanguageLevel should have default values', () => {
        // arrange
        const languageId = 'javascript';
        
        // act
        var languageLevel = new LanguageLevel(languageId);

        // assert
        assert.strictEqual(languageLevel.getLanguageId(), languageId);
        assert.strictEqual(languageLevel.getLevel(), 1);
        assert.strictEqual(languageLevel.getExperience(), 0);
        assert.strictEqual(languageLevel.getNextLevelExpTreshold(), 100);
    });

    test('Created LanguageLevel should have the given values', () => {
        // arrange
        const languageId = 'javascript';
        const level = 2;
        const experience = 50;
        
        // act
        var languageLevel = new LanguageLevel(languageId, level, experience);

        // assert
        assert.strictEqual(languageLevel.getLanguageId(), languageId);
        assert.strictEqual(languageLevel.getLevel(), level);
        assert.strictEqual(languageLevel.getExperience(), experience);
        assert.strictEqual(languageLevel.getNextLevelExpTreshold(), 200);
    });

    test('Gained experience should be added', () => {
        // arrange
        const languageId = 'javascript';
        const level = 1;
        const experience = 10;
        const gainExpAmount = 10;
        
        const expectedExperience = experience + gainExpAmount;

        var languageLevel = new LanguageLevel(languageId, level, experience);
        
        // act
        languageLevel.gainExp(gainExpAmount);

        // assert
        assert.strictEqual(languageLevel.getExperience(), expectedExperience);
    });

    test('Reaching exp treshold should level up', () => {
        // arrange
        const languageId = 'javascript';
        const level = 1;
        const experience = 90;
        const gainExpAmount = 10;
        
        var languageLevel = new LanguageLevel(languageId, level, experience);
        
        // act
        languageLevel.gainExp(gainExpAmount);

        // assert
        assert.strictEqual(languageLevel.getLevel(), 2);
        assert.strictEqual(languageLevel.getExperience(), 0);
        assert.strictEqual(languageLevel.getNextLevelExpTreshold(), 200);
    });

    test('Reaching exp treshold should level up and keep the rest of the exp', () => {
        // arrange
        const languageId = 'javascript';
        const level = 1;
        const experience = 90;
        const gainExpAmount = 20;
        
        var languageLevel = new LanguageLevel(languageId, level, experience);
        
        // act
        languageLevel.gainExp(gainExpAmount);

        // assert
        assert.strictEqual(languageLevel.getLevel(), 2);
        assert.strictEqual(languageLevel.getExperience(), 10);
        assert.strictEqual(languageLevel.getNextLevelExpTreshold(), 200);
    });

    test('Should correctly calculate the progress', () => {
        // arrange
        const languageId = 'javascript';
        const level = 1;
        const experience = 23;
        
        const expectedProgressPercentage = 23;

        var languageLevel = new LanguageLevel(languageId, level, experience);
        
        // act
        var progress = languageLevel.calculateProgress();

        // assert
        assert.strictEqual(progress, expectedProgressPercentage);
    });

    test('Should correctly stringify the object', () => {
        // arrange
        const languageId = 'javascript';
        const level = 1;
        const experience = 23;
        
        const expectedString = `Language: ${languageId} Level: ${level} Experience: ${experience}`;

        var languageLevel = new LanguageLevel(languageId, level, experience);
        
        // act
        var string = languageLevel.stringify();

        // assert
        assert.strictEqual(string, expectedString);
    });
});