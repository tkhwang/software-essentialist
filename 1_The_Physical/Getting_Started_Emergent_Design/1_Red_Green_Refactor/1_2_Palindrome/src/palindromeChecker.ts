export class PalindromeChecker {
    isPalindrome(word: string): boolean {
        const normalizedWord = word.toLowerCase();
        const reversedWord = normalizedWord.split("").reverse().join("");

        return normalizedWord === reversedWord;
    }
}
