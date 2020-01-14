import faker from 'faker';

export function buildUserInfo({ email = true, password = true, ...opts } = {}) {
  return {
    email: !email ? null : faker.internet.email(),
    signinMethod: {
      method: 'local',
      password: !password ? null : faker.internet.password()
    },
    ...opts
  };
}
