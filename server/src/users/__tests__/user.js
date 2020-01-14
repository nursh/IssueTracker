import buildUser from '../user';
import { buildUserInfo } from 'test/generate-data/user';
import * as userValidation from 'helpers/user-validation';

jest.mock('helpers/user-validation', () => ({
  validateUser: jest.fn(userInfo => userInfo),
  normalizeUser: jest.fn(userInfo => userInfo)
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('buildUser() - builds a user given userInfo', () => {
  test('Returns a user given valid inputs', () => {
    const userInfo = buildUserInfo();
    const { validateUser, normalizeUser } = userValidation;

    const result = buildUser(userInfo);

    expect(validateUser).toHaveBeenCalledTimes(1);
    expect(validateUser).toHaveBeenCalledWith(userInfo);

    expect(normalizeUser).toHaveBeenCalledTimes(1);
    expect(normalizeUser).toHaveBeenCalledWith(userInfo);

    expect(result).toEqual(userInfo);
  });
});
