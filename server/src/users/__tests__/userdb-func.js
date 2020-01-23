import { userDB } from '../index';
import { buildUserInfo } from 'test/generate';

let user;

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await userDB.deleteMany();
});

async function setup() {
  const { inserted } = await userDB.insertOne(buildUserInfo());
  user = inserted;
}

describe('insertOne(): ', () => {
  it('inserts a new user given valid user info details', async () => {
    const testUser = buildUserInfo();
    const {
      signinMethod: { password: generatedPassword }
    } = testUser;
    const { inserted } = await userDB.insertOne(testUser);

    expect(inserted.email).toBe(testUser.email);

    // Make sure the password has been hashed
    expect(inserted.signinMethod.password).not.toBe(generatedPassword);
  });
});

describe('findOne(): ', () => {
  it('returns an existing user given valid query', async () => {
    const foundUser = await userDB.findOne({ 'signinMethod.method': 'local' });
    expect(foundUser).not.toBeNull();
  });

  it('returns null when user does not exist', async () => {
    const foundUser = await userDB.findOne({ 'signinMethod.method': 'github' });
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
