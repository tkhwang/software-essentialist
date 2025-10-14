import { PalindromeChecker } from "./palindromeChecker";

describe('palindrome checker', () => {

    let palindromeChecker: PalindromeChecker;

    beforeEach(() => {
        palindromeChecker = new PalindromeChecker();
    })

    it.each([
        { word: 'mom', expected: true },
        { word: 'Mom', expected: true },
        { word: 'bill', expected: false },
        { word: 'Bill', expected: false },
    ])('should return $expected for "$word"', ({ word, expected }) => {
        const result = palindromeChecker.isPalindrome(word);
        expect(result).toBe(expected);
    });
})
