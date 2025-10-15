
export type StatsCalculatorResult = {
    min: number;
    max: number;
    numberOfSequence: number;
    average: number;
};

export class StatsCalculator {
    static calculate(sequence: number[]): StatsCalculatorResult {
        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        let numberOfSequence = 0;
        let average = 0;

        if (sequence.length === 0) {
            return {
                min,
                max,
                numberOfSequence,
                average,
            };
        }

        for (const value of sequence) {
            if (value < min) min = value;
            if (value > max) max = value;
            sum += value;
        }

        numberOfSequence = sequence.length;
        average = Number((sum / numberOfSequence).toFixed(12));

        return {
            min,
            max,
            numberOfSequence,
            average,
        };
    }
}
