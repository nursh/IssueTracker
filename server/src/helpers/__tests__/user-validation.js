import cases from 'jest-in-case';

import {
  validateEmail,
  validatePassword,
  validateSigninMethod,
  normalizeUser,
  validateUser
} from '../user-validation';
import { buildUserInfo } from 'test/generate';

function casifyPassword(obj) {
  return Object.entries(obj).map(([name, password]) => ({
    name: `${password} - ${name}`,
    password
  }));
}

function casifyEmail(obj) {
  return Object.entries(obj).map(([name, email]) => ({
    name: `${email} - ${name}`,
    email
  }));
}

cases(
  'validatePassword() - valid password',
  ({ password }) => {
    expect(() => validatePassword(password)).not.toThrow(
      'Invalid password. Password must satisfy all criteria.'
    );
  },
  casifyPassword({ 'valid password': 'Tanker023' })
);

cases(
  'validatePassword() - invalid passwords',
  ({ password }) => {
    expect(() => validatePassword(password)).toThrow(
      'Invalid password. Password must satisfy all criteria.'
    );
  },
  casifyPassword({
    'Too short': 'Ter023',
    'No uppercase letters': 'ter123458',
    'No lowercase': 'TERDSLHFSJO98',
    'No numbers': 'Terrancke'
  })
);

cases(
  'validateEmail() - valid emails',
  ({ email }) => {
    expect(() => validateEmail(email)).not.toThrow(
      'Invalid email address format.'
    );
  },
  casifyEmail({
    'valid email': 'nur@email.com',
    'email with dot': 'nur.man@email.com',
    'digits in address email': '123@email.com',
    'underscore in email': 'nur_moh@email.com',
    'dash in name': 'nur@email-one.com'
  })
);

cases(
  'validateEmail() - invalid emails',
  ({ email }) => {
    expect(() => validateEmail(email)).toThrow('Invalid email address format.');
  },
  casifyEmail({
    'missing @ sign': 'nuremail.com',
    'missing address': '@email.com',
    'using two @ signs': 'nur@road@email.com'
  })
);

describe('validateSigninMethod(): ', () => {
  test('does not throw error on valid signin methods', () => {
    expect(() => validateSigninMethod({ method: 'local' })).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSigninMethod({ method: 'github' })).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSigninMethod({ method: 'google' })).not.toThrow(
      'Invalid Signin method.'
    );
  });

  test('throws error when local method is used without password', () => {
    expect(() => validateSigninMethod({ method: 'local' })).toThrowError(
      'Password field is required.'
    );
  });

  test('throws error when github method is used without githubId', () => {
    expect(() => validateSigninMethod({ method: 'github' })).toThrowError(
      'Github signin must have an id.'
    );
  });

  test('throws error when google method is used without googleid', () => {
    expect(() => validateSigninMethod({ method: 'google' })).toThrowError(
      'Google signin must have an id.'
    );
  });

  test('does not throw error when called with local method and password', () => {
    expect(() =>
      validateSigninMethod({ method: 'local', password: '12GenghisKahn' })
    ).not.toThrowError('Password field is required.');
  });

  test('does not throw error when called with github method and githubId', () => {
    expect(() =>
      validateSigninMethod({ method: 'github', githubId: '123455' })
    ).not.toThrowError('Github signin must have an id.');
  });

  test('does not throw error when called with google method and googleid', () => {
    expect(() =>
      validateSigninMethod({ method: 'google', googleId: '918782693' })
    ).not.toThrowError('Google signin must have an id.');
  });

  test('throws error on invalid signin methods', () => {
    expect(() => validateSigninMethod('yahoo')).toThrow(
      'Invalid Signin method.'
    );
  });
});

describe('normalizeUser(): ', () => {
  test('returns a user with lowercase email', () => {
    const user = buildUserInfo();
    user.email = user.email.toLowerCase();

    expect(normalizeUser(user)).toHaveProperty('email', user.email);
  });
});

describe('validateUser(): ', () => {
  test('throws an error when required field -email is not provided', () => {
    const user = buildUserInfo({ email: false });
    expect(() => validateUser(user)).toThrow(
      'email is required, cannot be null or undefined'
    );
  });

  test('throws an error when required field - signinMethod is not provided', () => {
    const user = buildUserInfo({ signinMethod: false });
    expect(() => validateUser(user)).toThrow(
      'signinMethod is required, cannot be null or undefined'
    );
  });
});
