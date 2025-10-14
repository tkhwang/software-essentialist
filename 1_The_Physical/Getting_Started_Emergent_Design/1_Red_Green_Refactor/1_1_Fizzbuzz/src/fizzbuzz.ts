export const fizzbuzz = (number: number): string => {
    if (number < 1 || number > 100) {
        throw new Error("Number must be between 1 and 100");
    }

    const isDivisibleBy3 = number % 3 === 0;
    const isDivisibleBy5 = number % 5 === 0;

    if (isDivisibleBy3 && isDivisibleBy5) return "FizzBuzz";

    if (isDivisibleBy3) return "Fizz";

    if (isDivisibleBy5) return "Buzz";

    return String(number);
};
