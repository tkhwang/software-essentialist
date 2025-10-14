import { PalindromeChecker } from "./palindromeChecker";

describe('palindrome checker', () => {

    let palindromeChecker: PalindromeChecker;

    beforeEach(() => {
        palindromeChecker = new PalindromeChecker();
    })

    it('should return true if the word is "mom"', () => {
        const result = palindromeChecker.isPalindrome("mom");

        expect(result).toBe(true);
    })

    it('should return true if the word is "Mom"', () => {
        const result = palindromeChecker.isPalindrome("mom");

        expect(result).toBe(true);
    })

    it('should return true if the word is "bill"', () => {
        const result = palindromeChecker.isPalindrome("bill");

        expect(result).toBe(false);
    })

    it('should return true if the word is "Bill"', () => {
        const result = palindromeChecker.isPalindrome("bill");

        expect(result).toBe(false);
    })
})
