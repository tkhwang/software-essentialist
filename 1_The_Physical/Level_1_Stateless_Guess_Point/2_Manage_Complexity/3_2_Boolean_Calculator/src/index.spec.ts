import { BooleanCalculator } from "./boolean-calculator";

describe('boolean calculator', () => {
    describe("For invalid inputs", () => {
        it("should return false for empty input", () => {
            const inputText = ""

            const result = BooleanCalculator.evaluate(inputText);

            expect(result).toBe(false);
        })
    })

    describe("For simple inputs", () => {
        it.each([
            { inputText: "TRUE", expected: true },
            { inputText: "FALSE", expected: false },
            { inputText: "NOT TRUE", expected: false },
            { inputText: "NOT FALSE", expected: true },
        ])("should return $expected for $inputText", ({ inputText, expected }) => {
            const result = BooleanCalculator.evaluate(inputText);

            expect(result).toBe(expected);
        })
    })

    describe("For and|or operator inputs", () => {
        it.each([
            { inputText: "TRUE AND FALSE", expected: false },
            { inputText: "TRUE AND TRUE", expected: true },
            { inputText: "TRUE OR FALSE", expected: true },
            { inputText: "FALSE OR FALSE", expected: false },
        ])("should return $expected for $inputText", ({ inputText, expected }) => {
            const result = BooleanCalculator.evaluate(inputText);

            expect(result).toBe(expected);
        })
    })


    describe("For parenthesis inputs", () => {
        it.each([
            { inputText: "(TRUE OR TRUE OR TRUE) AND FALSE", expected: false },
            { inputText: "NOT (TRUE AND TRUE)", expected: false },
            { inputText: "(TRUE AND FALSE) OR (TRUE AND TRUE)", expected: true },
            { inputText: "(TRUE AND FALSE OR TRUE) OR (TRUE AND TRUE AND FALSE)", expected: true },
            { inputText: "(FALSE OR FALSE) AND (TRUE OR FALSE)", expected: false },
        ])("should return $expected for $inputText", ({ inputText, expected }) => {
            const result = BooleanCalculator.evaluate(inputText);

            expect(result).toBe(expected);
        })
    })
})
