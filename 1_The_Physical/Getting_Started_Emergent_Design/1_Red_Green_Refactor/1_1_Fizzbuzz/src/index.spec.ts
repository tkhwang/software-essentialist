import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
    it("should return string type", () => {
        const result = fizzbuzz(1);

        expect(typeof result).toBe("string");
    })

    // 3 -> Fizz
    // 5 -> Buzz
    // 15 -> FizzBuzz
    it.each([
        { input: 3, output: "Fizz", msg: "divisible by 3" },
        { input: 6, output: "Fizz", msg: "divisible by 3" },
        { input: 5, output: "Buzz", msg: "divisible by 5" },
        { input: 10, output: "Buzz", msg: "divisible by 5" },
        { input: 15, output: "FizzBuzz", msg: "divisible by 3 and 5" },
        { input: 30, output: "FizzBuzz", msg: "divisible by 3 and 5" },
    ])("should return $output if the number is $msg", ({ input, output }) => {
        const result = fizzbuzz(input);
        expect(result).toBe(output);
    })

    it("should throw an error if the number is larger than 100", () => {
        expect(() => fizzbuzz(101)).toThrow("Number must be between 1 and 100");
    })
    it("should throw an error if the number is less than 1", () => {
        expect(() => fizzbuzz(0)).toThrow("Number must be between 1 and 100");
    })
});
