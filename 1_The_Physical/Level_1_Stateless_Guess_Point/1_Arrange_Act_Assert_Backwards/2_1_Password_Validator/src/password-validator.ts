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
        return {
            result: false,
            errors: ['PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG']
        }
    }
}