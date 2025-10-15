import { StatsCalculator } from "./stats-calcurator";

describe('stats calculator', () => {
    describe('For empty sequence', () => {
        it('should throw an error', () => {
            expect(() => StatsCalculator.calculate([])).toThrow('Sequence is empty');
        });
    });

    describe('For valid sequence', () => {
        it('should return the correct statistics', () => {
            const { min, max, numberOfSequence, average } = StatsCalculator.calculate([2, 4, 21, -8, 53, 40]);

            expect(min).toBe(-8);
            expect(max).toBe(53);
            expect(numberOfSequence).toBe(6);
            expect(average).toBe(18.666666666667);
        });
    });
})
