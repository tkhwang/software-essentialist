import { PasswordValidatorResult } from "./password-validator.type";

export class PasswordValidator {

    validate(password: string): PasswordValidatorResult {
        return {
            result: false,
            errors: ['PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG']
        }
    }
}