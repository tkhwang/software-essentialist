import { StatsCalculator } from "./stats-calculator";

describe('stats calculator', () => {
    it.each<[number[], { min: number; max: number; numberOfSequence: number; average: number }]>([
        [[], { min: Infinity, max: -Infinity, numberOfSequence: 0, average: 0 }],
        [[2, 4, 21, -8, 53, 40], { min: -8, max: 53, numberOfSequence: 6, average: 18.666666666667 }],
        [[1, 2, 3, 4, 5], { min: 1, max: 5, numberOfSequence: 5, average: 3 }],
        [[-10, 0, 10], { min: -10, max: 10, numberOfSequence: 3, average: 0 }],
    ])('should return the correct statistics', (sequence, expected) => {
        const { min, max, numberOfSequence, average } = StatsCalculator.calculate(sequence);

        expect(min).toBe(expected.min);
        expect(max).toBe(expected.max);
        expect(numberOfSequence).toBe(expected.numberOfSequence);
        expect(average).toBe(expected.average);
    });
});
