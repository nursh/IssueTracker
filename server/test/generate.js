import faker from 'faker';

export function buildUserInfo({
  email = true,
  password = true,
  signinMethod = true
} = {}) {
  return {
    ...(email && { email: faker.internet.email() }),
    ...(signinMethod && {
      signinMethod: {
        method: 'local',
        ...(password && { password: faker.internet.password() })
      }
    })
  };
}

export function localLoginForm({ email = true, password = true } = {}) {
  return {
    ...(email && { email: faker.internet.email() }),
    ...(password && { password: faker.internet.password() })
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
