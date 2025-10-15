export type PASSWORD_VALIDATOR_ERRORS =
    | "PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG"
    | "PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT"
    | "PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER"

export type PasswordValidatorResult = {
    result: boolean;
    errors: PASSWORD_VALIDATOR_ERRORS[];
}

export class PasswordValidator {

    validate(password: string): PasswordValidatorResult {
        const errors: PASSWORD_VALIDATOR_ERRORS[] = [];

        const passwordLength = password.length;
        if (passwordLength < 5 || passwordLength > 15) errors.push('PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG');

        const hasDigit = /\d/.test(password);
        if (!hasDigit) errors.push('PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT');

        const hasUpperCase = /[A-Z]/.test(password);
        if (!hasUpperCase) errors.push('PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER');

        return {
            result: errors.length === 0,
            errors
        }
    }
}