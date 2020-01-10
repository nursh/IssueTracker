import { requiredParam } from '../helpers/required-param';

export default function buildUser(userInfo = requiredParam('userInfo')) {
  const validUser = validate(userInfo);
  const user = normalize(validUser);

  return user;
}

function validate(
  {
    email = requiredParam('email'),
    createdOn = new Date(),
    signinMethod,
    password,
    ...otherInfo
  },
  doc = false
) {
  validateEmail(email);
  if (signinMethod === 'local' && !doc) {
    validatePassword(password);
  }

  return {
    email,
    password,
    createdOn,
    signinMethod,
    ...otherInfo
  };
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    throw new Error('Invalid email address format.');
  }
}

function validatePassword(password) {
  const validPassword =
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password);

  if (!validPassword) {
    throw new Error('Invalid password. Password must satisfy all criteria');
  }
}

function normalize({ email, ...otherInfo }) {
  return {
    ...otherInfo,
    email: email.toLowerCase()
  };
}
