import { beforeEach, describe, expect, it, test } from '@jest/globals';
import { PasswordValidator } from './password-validator';

/*

PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG  Between 5 and 15 characters long 
PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT: Contains at least one digit
PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER: Contains at least one upper case letter

Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence.There can be multiple errors at a single time.

{
  result: boolean;
  errors: string[];
}
*/

describe('password validator', () => {

  let passwordValidator: PasswordValidator;
  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  })

  it('should return failure if a password is "1234".', () => {
    const password = '1234';

    const { result, errors } = passwordValidator.validate(password);

    expect(result).toBe(false);
    expect(errors).toContain('PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG');
  })

  it('should return failure if a password is "1234567890123456".', () => {
    const password = '1234567890123456';

    const { result, errors } = passwordValidator.validate(password);

    expect(result).toBe(false);
    expect(errors).toContain('PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG');
  })
})

