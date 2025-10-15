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

  it.each([
    {
      password: 'maxwell1_c',
      result: false,
      errors: [
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER',
      ]
    },
    {
      password: 'maxwellTheBe',
      result: false,
      errors: [
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT',
      ]
    },
    {
      password: 'thePhysical1234567',
      result: false,
      errors: [
        'PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG',
      ]
    },
    {
      password: 'Password123',
      result: true,
      errors: []
    },

  ])('should return $expected for "$password"', ({ password, result: expectedResult, errors: expectedErrors }) => {
    const { result, errors } = passwordValidator.validate(password);

    expect(result).toBe(expectedResult);

    expect(errors).toEqual(expect.arrayContaining(expectedErrors));
    expect(errors).toHaveLength(expectedErrors.length);
  })
})

