import { requiredParam } from './required-param';

export const validateUser = ({
  name = requiredParam('name'),
  email = requiredParam('email'),
  createdOn = new Date(),
  signupMethod = requiredParam('signupMethod'),
  ...otherFields
}) => {
  validateEmail(email);
  validateSignupMethod(signupMethod, otherFields);

  return {
    name,
    email,
    createdOn,
    signupMethod,
    ...otherFields
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
  const validPassword =
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password);

  if (!validPassword) {
    throw new Error('Invalid password. Password must satisfy all criteria.');
  }
}

export function validateSignupMethod(
  signupMethod = requiredParam('signupMethod'),
  otherFields = requiredParam('UserInfo')
) {
  switch (signupMethod) {
    case 'local': {
      const { local } = otherFields;

      if (!local) {
        throw new Error('Password field is required.');
      }

      validatePassword(local.password);
      break;
    }

    case 'github': {
      const { github } = otherFields;
      if (!github) {
        throw new Error('Github signin must have an id.');
      }
      break;
    }

    case 'google': {
      const { google } = otherFields;
      if (!google) {
        throw new Error('Google signin must have an id.');
      }
      break;
    }

    default: {
      throw new Error('Invalid Signup method.');
    }
  }
}

export function normalizeUser({ email, ...otherInfo }) {
  return {
    ...otherInfo,
    email: email.toLowerCase()
  };
}
