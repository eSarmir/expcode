import * as assert from 'assert';
import { LanguageLevel } from '../languageLevel';

suite('LanguageLevel Test Suite', () => {
    
    test('New test should have default values', () => {
        var languageLevel = new LanguageLevel('test');

        assert.strictEqual(languageLevel.getLanguageId(), 'test');
        assert.strictEqual(languageLevel.getLevel(), 1);
        assert.strictEqual(languageLevel.getExperience(), 0);
    });
});