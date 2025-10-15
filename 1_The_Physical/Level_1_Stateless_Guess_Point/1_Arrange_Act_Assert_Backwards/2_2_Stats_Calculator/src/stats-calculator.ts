
export type StatsCalculatorResult = {
    min: number;
    max: number;
    numberOfSequence: number;
    average: number;
};

export class StatsCalculator {
    static calculate(sequence: number[]): StatsCalculatorResult {
        const numberOfSequence = sequence.length;

        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        let average = 0;

        if (numberOfSequence === 0) return { min, max, numberOfSequence, average };

        for (const value of sequence) {
            if (value < min) min = value;
            if (value > max) max = value;
            sum += value;
        }

        average = Number((sum / numberOfSequence).toFixed(12));

        return { min, max, numberOfSequence, average };
    }
}