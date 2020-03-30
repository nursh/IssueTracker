import cases from 'jest-in-case';

import {
  validateEmail,
  validatePassword,
  validateSignupMethod,
  normalizeUser,
  validateUser
} from '../user-validation';
import { buildTestUser } from 'test/generate';

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

describe('validateSignupMethod(): ', () => {
  let userLocal;
  let userGoogle;
  let userGithub;

  beforeAll(() => {
    userLocal = buildTestUser();
    userGoogle = buildTestUser({ signupMethod: 'google' });
    userGithub = buildTestUser({ signupMethod: 'github' });
  });

  it('does not throw error on valid signin methods', () => {
    const { localMethod, ...localInfo } = userLocal;
    const { googleMethod, ...googleInfo } = userGoogle;
    const { githubMethod, ...githubInfo } = userGithub;

    expect(() => validateSignupMethod(localMethod, localInfo)).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSignupMethod(googleMethod, googleInfo)).not.toThrow(
      'Invalid Signin method.'
    );
    expect(() => validateSignupMethod(githubMethod, githubInfo)).not.toThrow(
      'Invalid Signin method.'
    );
  });

  it('throws error when local method is used without password', () => {
    const user = buildTestUser({ options: { methodObj: false } });
    expect(() => validateSignupMethod(user.signupMethod, user)).toThrowError(
      'Password field is required.'
    );
  });

  it('throws error when github method is used without githubId', () => {
    const user = buildTestUser({
      signupMethod: 'github',
      options: { methodObj: false }
    });
    expect(() => validateSignupMethod(user.signupMethod, user)).toThrowError(
      'Github signin must have an id.'
    );
  });

  it('throws error when google method is used without googleid', () => {
    const user = buildTestUser({
      signupMethod: 'google',
      options: { methodObj: false }
    });
    expect(() => validateSignupMethod(user.signupMethod, user)).toThrowError(
      'Google signin must have an id.'
    );
  });

  it('does not throw error when called with local signupMethod and password', () => {
    const { signupMethod } = userLocal;
    expect(() =>
      validateSignupMethod(signupMethod, userLocal)
    ).not.toThrowError('Password field is required.');
  });

  it('does not throw error when called with github signupMethod and githubId', () => {
    expect(() =>
      validateSignupMethod(userGithub.signupMethod, userGithub)
    ).not.toThrowError('Github signin must have an id.');
  });

  it('does not throw error when called with google signupMethod and googleid', () => {
    expect(() =>
      validateSignupMethod(userGoogle.signupMethod, userGoogle)
    ).not.toThrowError('Google signin must have an id.');
  });

  it('throws error on invalid signin methods', () => {
    expect(() => validateSignupMethod('yahoo', userLocal)).toThrow(
      'Invalid Signup method.'
    );
  });
});

describe('normalizeUser(): ', () => {
  it('returns a user with lowercase email', () => {
    const user = buildTestUser();
    user.email = user.email.toLowerCase();

    expect(normalizeUser(user)).toHaveProperty('email', user.email);
  });
});

describe('validateUser(): ', () => {
  it('throws an error when required field - email is not provided', () => {
    const user = buildTestUser({ options: { email: false } });
    expect(() => validateUser(user)).toThrow(
      'email is required, cannot be null or undefined'
    );
  });

  it('throws an error when required field - name is not provided', () => {
    const user = buildTestUser({ options: { name: false } });
    expect(() => validateUser(user)).toThrow(
      'name is required, cannot be null or undefined'
    );
  });

  it('throws an error when required field - signupMethod is not provided', () => {
    const user = buildTestUser({ options: { signupMethod: false } });
    expect(() => validateUser(user)).toThrow(
      'signupMethod is required, cannot be null or undefined'
    );
  });
});
