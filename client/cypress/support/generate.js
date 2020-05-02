import faker from 'faker';

export const buildUser = (overrides) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: `${faker.internet.password()}ABcd09`,
    ...overrides
  };
}

export const buildProject = (overrides) => {
  return {
    title: faker.commerce.productName(),
    description: faker.random.words(),
    ...overrides
  };
}

export const buildIssue = (overrides) => {
  return {
    title: faker.lorem.words(),
    description: faker.random.words(),
    ...overrides
  }
}