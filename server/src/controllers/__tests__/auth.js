import * as users from 'users';
import { signupController } from '../auth';
import { buildReq, buildRes, localSignupForm } from 'test/generate';

jest.mock('users');
jest.mock('helpers/jwt-helper', () => {
  return {
    signToken: jest.fn(() => 'token')
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signup controller', () => {
  it('returns an error when email or password is not provided.', async () => {
    const loginInfo = localSignupForm({ email: false });
    const req = buildReq(loginInfo);
    const res = buildRes();

    await signupController(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Name, Email and Password fields must be provided.'
    });
  });

  it('returns an error when user already exists.', async () => {
    const loginInfo = localSignupForm();
    const req = buildReq(loginInfo);
    const res = buildRes();

    users.userDB.findByEmail.mockResolvedValueOnce(loginInfo);

    await signupController(req, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Email is in use'
    });
  });

  it('returns a token given valid input fields', async () => {
    const loginInfo = localSignupForm();
    const req = buildReq(loginInfo);
    const res = buildRes();

    users.buildUser.mockResolvedValueOnce(loginInfo);
    users.userDB.insertOne.mockResolvedValueOnce({ success: true });

    await signupController(req, res);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      token: 'token'
    });
  });
});
