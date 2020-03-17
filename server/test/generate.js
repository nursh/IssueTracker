import faker from 'faker';
import {
  statusValues,
  priorityValues,
  progressValues
} from 'helpers/issue-schema-enums';

const getPassword = () => `${faker.internet.password()}ABcd09`;
const getName = faker.name.findName;
const getEmail = faker.internet.email;
const getId = faker.random.uuid;
const getTitle = () => `${faker.commerce.productName()}abc`;
const getDescription = faker.lorem.words;

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const getStatus = () => statusValues[getRandomInt(statusValues.length)];
const getPriority = () => priorityValues[getRandomInt(priorityValues.length)];
const getProgress = () => progressValues[getRandomInt(progressValues.length)];

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
    ...(title && { title: getTitle() }),
    description: getDescription(),
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

export function buildTestIssue({
  title = true,
  project = true,
  progress = true,
  status = true,
  priority = true,
  createdBy = true
} = {}) {
  return {
    ...(title && { title: getTitle() }),
    description: getDescription(),
    ...(project && { project: getId() }),
    createdOn: new Date(),
    ...(progress && { progress: getProgress() }),
    ...(status && { status: getStatus() }),
    ...(priority && { priority: getPriority() }),
    ...(createdBy && {
      createdBy: {
        id: getId(),
        name: getName()
      }
    })
  };
}
