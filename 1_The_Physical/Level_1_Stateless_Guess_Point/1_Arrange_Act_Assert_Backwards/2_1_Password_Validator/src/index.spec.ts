import { beforeEach, describe, expect, it } from '@jest/globals';
import { PasswordValidator, type PASSWORD_VALIDATOR_ERRORS } from './password-validator';

type ValidationCase = {
  description: string;
  password: string;
  expectedResult: boolean;
  expectedErrors: PASSWORD_VALIDATOR_ERRORS[];
};

describe('password validator', () => {
  const validationCases: ValidationCase[] = [
    {
      description: 'it lacks an upper case letter',
      password: 'maxwell1_c',
      expectedResult: false,
      expectedErrors: ['PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER'],
    },
    {
      description: 'it lacks a digit',
      password: 'maxwellTheBe',
      expectedResult: false,
      expectedErrors: ['PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT'],
    },
    {
      description: 'it is too long',
      password: 'thePhysical1234567',
      expectedResult: false,
      expectedErrors: ['PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG'],
    },
    {
      description: 'it lacks both a digit and an upper case letter',
      password: 'password',
      expectedResult: false,
      expectedErrors: [
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT',
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER',
      ],
    },
    {
      description: 'it is too short and lacks an upper case letter',
      password: '1234',
      expectedResult: false,
      expectedErrors: [
        'PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG',
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER',
      ],
    },
    {
      description: 'it violates every rule',
      password: 'abc',
      expectedResult: false,
      expectedErrors: [
        'PASSWORD_SHOULD_BE_BETWEEN_5_AND_15_CHARACTERS_LONG',
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_DIGIT',
        'PASSWORD_SHOULD_CONTAIN_AT_LEAST_ONE_UPPER_CASE_LETTER',
      ],
    },
    {
      description: 'it satisfies every rule',
      password: 'Password123',
      expectedResult: true,
      expectedErrors: [],
    },
  ];

  it.each(validationCases)(
    'should return $expectedResult when $description (password: "$password")',
    ({ password, expectedResult, expectedErrors }) => {
      const { result, errors } = PasswordValidator.validate(password);

      expect(result).toBe(expectedResult);

      // To guarantee the order of the errors is not correct, we use expect.arrayContaining
      expect(errors).toEqual(expect.arrayContaining(expectedErrors));
      expect(errors).toHaveLength(expectedErrors.length);
    }
  );
});
