export const PASSWORD_VALIDATOR_ERRORS = {
    LENGTH: "PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG",
    NO_DIGIT: "PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT",
    NO_UPPERCASE: "PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER",
} as const;

export type PASSWORD_VALIDATOR_ERRORS = typeof PASSWORD_VALIDATOR_ERRORS[keyof typeof PASSWORD_VALIDATOR_ERRORS];

export type PasswordValidatorResult = {
    result: boolean;
    errors: PASSWORD_VALIDATOR_ERRORS[];
}

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 15;
const DIGIT_REGEX = /\d/;
const UPPERCASE_REGEX = /[A-Z]/;

export class PasswordValidator {
    static validate(password: string): PasswordValidatorResult {
        const errors: PASSWORD_VALIDATOR_ERRORS[] = [];

        if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            errors.push(PASSWORD_VALIDATOR_ERRORS.LENGTH);
        }

        if (!DIGIT_REGEX.test(password)) {
            errors.push(PASSWORD_VALIDATOR_ERRORS.NO_DIGIT);
        }

        if (!UPPERCASE_REGEX.test(password)) {
            errors.push(PASSWORD_VALIDATOR_ERRORS.NO_UPPERCASE);
        }

        return {
            result: errors.length === 0,
            errors
        }
    }
}

