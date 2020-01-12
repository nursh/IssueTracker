import { validateEmail, validatePassword, validateSigninMethod } from '../user';
import cases from 'jest-in-case';

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
    expect(() => validateSigninMethod('local')).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSigninMethod('github')).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSigninMethod('google')).not.toThrow(
      'Invalid Signin method.'
    );
  });

  test('throws error on invalid signin methods', () => {
    expect(() => validateSigninMethod('yahoo')).toThrow(
      'Invalid Signin method.'
    );
  });
});
