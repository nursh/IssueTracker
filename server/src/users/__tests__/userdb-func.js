import { userDB } from '../index';
import { buildTestUser } from 'test/generate';

let user;

beforeAll(async () => {
  const { inserted } = await userDB.insertOne(buildTestUser());
  user = inserted;
});

afterAll(async () => {
  await userDB.delete({});
});

describe('insertOne(): ', () => {
  it('inserts a new user given valid user info details', async () => {
    const testUser = buildTestUser();
    const {
      local: { password: generatedPassword }
    } = testUser;
    const { inserted } = await userDB.insertOne(testUser);

    expect(inserted.email).toBe(testUser.email);

    // Make sure the password has been hashed
    expect(inserted.local.password).not.toBe(generatedPassword);
  });
});

describe('findOne(): ', () => {
  it('returns an existing user given valid query', async () => {
    const foundUser = await userDB.findOne({ signupMethod: 'local' });
    expect(foundUser).not.toBeNull();
  });

  it('returns null when user does not exist', async () => {
    const foundUser = await userDB.findOne({ signupMethod: 'github' });
    expect(foundUser).toBeNull();
  });
});

describe('findByEmail(): ', () => {
  it('returns an existing user given existing email', async () => {
    const email = user.email;

    const foundUser = await userDB.findByEmail(email);
    expect(foundUser).not.toBeNull();
  });

  it('returns null when user with email does not exist', async () => {
    const email = 'pendrageon@email.com';

    const foundUser = await userDB.findByEmail(email);
    expect(foundUser).toBeNull();
  });
});

describe('findById(): ', () => {
  it('returns an existing user given existing id', async () => {
    const id = user.id;

    const foundUser = await userDB.findById(id);
    expect(foundUser).not.toBeNull();
  });

  it('returns null when user with id does not exist', async () => {
    const id = 'some_id';

    const foundUser = await userDB.findById(id);
    expect(foundUser).toBeNull();
  });
});
