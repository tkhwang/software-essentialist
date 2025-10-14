export const fizzbuzz = (number: number): string => {
    if (number > 100) {
        throw new Error("Number must be less than 100");
    }

    const isDivisibleBy3 = number % 3 === 0;
    const isDivisibleBy5 = number % 5 === 0;

    if (isDivisibleBy3 && isDivisibleBy5) return "FizzBuzz";

    if (isDivisibleBy3) return "Fizz";

    if (isDivisibleBy5) return "Buzz";

    return String(number);
};
