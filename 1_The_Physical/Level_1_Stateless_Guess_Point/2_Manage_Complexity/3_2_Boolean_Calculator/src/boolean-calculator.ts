
const AND_OPERATOR = " and ";
const OR_OPERATOR = " or ";
const PAREN_EXPRESSION = /\([^()]+\)/;

export class BooleanCalculator {
    static evaluate(expression: string): boolean {
        expression = expression.toLowerCase().trim();

        while (PAREN_EXPRESSION.test(expression)) {
            expression = expression.replace(PAREN_EXPRESSION, (match) => {
                const subExpression = match.slice(1, -1);
                return String(this.evaluate(subExpression));
            }).trim();
        }

        if (expression.startsWith("not ")) {
            return !this.evaluate(expression.substring(4));
        }

        const orIndex = expression.lastIndexOf(OR_OPERATOR);
        if (orIndex > -1) {
            const left = expression.slice(0, orIndex);
            const right = expression.slice(orIndex + OR_OPERATOR.length);
            if (!left.trim() || !right.trim()) throw new Error("Invalid Expression");
            return this.evaluate(left) || this.evaluate(right);
        }

        const andIndex = expression.lastIndexOf(AND_OPERATOR);
        if (andIndex > -1) {
            const left = expression.slice(0, andIndex);
            const right = expression.slice(andIndex + AND_OPERATOR.length);
            if (!left.trim() || !right.trim()) throw new Error("Invalid Expression");
            return this.evaluate(left) && this.evaluate(right);
        }

        if (expression === "true") return true;
        if (expression === "false") return false;

        return false;
    }
}
