import requiredParam from './required-param';

export const validateUser = ({
  email = requiredParam('email'),
  createdOn = new Date(),
  signinMethod = requiredParam('signinMethod'),
  ...otherInfo
}) => {
  validateEmail(email);
  validateSigninMethod(signinMethod);

  return {
    email,
    createdOn,
    signinMethod,
    ...otherInfo
  };
};

export function validateEmail(email) {
  const emailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    throw new Error('Invalid email address format.');
  }
}

export function validatePassword(password) {
  if (!password) {
    throw new Error('Password field is required.');
  }

  const validPassword =
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password);

  if (!validPassword) {
    throw new Error('Invalid password. Password must satisfy all criteria.');
  }
}

export function validateSigninMethod({ method, ...signinInfo }) {
  switch (method) {
    case 'local': {
      const { password } = signinInfo;
      validatePassword(password);
      break;
    }

    case 'github': {
      if (!signinInfo.hasOwnProperty('githubId'))
        throw new Error('Github signin must have an id.');
      break;
    }

    case 'google': {
      if (!signinInfo.hasOwnProperty('googleId'))
        throw new Error('Google signin must have an id.');
      break;
    }

    default: {
      throw new Error('Invalid Signin method.');
    }
  }
}

export function normalizeUser({ email, ...otherInfo }) {
  return {
    ...otherInfo,
    email: email.toLowerCase()
  };
}
