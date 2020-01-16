import faker from 'faker';

export function buildUserInfo({
  email = true,
  password = true,
  signinMethod = true,
  ...opts
} = {}) {
  return {
    ...(email && { email: faker.internet.email() }),
    ...(signinMethod && {
      signinMethod: {
        method: 'local',
        ...(password && { password: faker.internet.password() })
      }
    }),
    ...opts
  };
}
