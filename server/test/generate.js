import faker from 'faker';

const getPassword = () => `${faker.internet.password()}ABcd09`;
const getName = faker.name.findName;
const getEmail = faker.internet.email;
const getId = faker.random.uuid;
const getProjectTitle = () => `${faker.commerce.productName()}abc`;
const getProjectDescription = faker.lorem.words;

export function buildTestUser({ signupMethod = 'local', options } = {}) {
  const userOptions = overrides => {
    return {
      name: true,
      email: true,
      signupMethod: true,
      methodObj: true,
      ...overrides
    };
  };

  function getUserSignupMethod(signupMethod) {
    switch (signupMethod) {
      case 'local': {
        return {
          local: {
            password: getPassword()
          }
        };
      }

      case 'github': {
        return {
          github: {
            githubId: getId()
          }
        };
      }

      case 'google': {
        return {
          google: {
            googleId: getId()
          }
        };
      }
    }
  }

  const opts = userOptions(options);
  const method = opts.methodObj && getUserSignupMethod(signupMethod);
  const name = opts.name && { name: getName() };
  const email = opts.email && { email: getEmail() };
  const signup = opts.signupMethod && { signupMethod };
  return {
    ...name,
    ...email,
    ...method,
    ...signup
  };
}

export function localSigninForm({ email = true, password = true } = {}) {
  return {
    ...(email && { email: getEmail() }),
    ...(password && { password: getPassword() })
  };
}

export function localSignupForm({
  name = true,
  email = true,
  password = true
} = {}) {
  return {
    ...(name && { name: getName() }),
    ...(email && { email: getEmail() }),
    ...(password && { password: getPassword() })
  };
}

export function buildReq(body = {}, opts) {
  return {
    ...(body && { body }),
    ...opts
  };
}

export function buildRes(opts) {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    ...opts
  };
  return res;
}

export function buildTestProject({ title = true, createdBy = true } = {}) {
  return {
    ...(title && { title: getProjectTitle() }),
    description: getProjectDescription(),
    createdOn: new Date(),
    ...(createdBy && {
      createdBy: {
        id: getId(),
        name: getName()
      }
    }),
    team: []
  };
}
