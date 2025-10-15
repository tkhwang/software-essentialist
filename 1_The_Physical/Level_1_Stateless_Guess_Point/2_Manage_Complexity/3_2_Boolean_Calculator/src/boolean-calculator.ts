
const AND_OPERATOR = " and ";
const OR_OPERATOR = " or ";
const PAREN_EXPRESSION = /\([^()]+\)/;

export class BooleanCalculator {
    static evaluate(expression: string): boolean {
        expression = expression.toLowerCase();

        while (PAREN_EXPRESSION.test(expression)) {
            expression = expression.replace(PAREN_EXPRESSION, (match) => {
                const subExpression = match.slice(1, match.length - 1).trim();
                return String(this.evaluate(subExpression));
            });
        }

        if (expression.includes(AND_OPERATOR)) {
            const [left, right] = expression.split(AND_OPERATOR);
            if (!left || !right) throw new Error("Invalid Expression");

            return this.evaluate(left) && this.evaluate(right);
        }

        if (expression.includes(OR_OPERATOR)) {
            const [left, right] = expression.split(OR_OPERATOR);
            if (!left || !right) throw new Error("Invalid Expression");

            return this.evaluate(left) || this.evaluate(right);
        }

        if (expression === "not true") return false;
        if (expression === "not false") return true;
        if (expression === "true") return true;

        return false;
    }
}
