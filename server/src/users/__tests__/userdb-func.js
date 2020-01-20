import { userDB } from '../index';
import { buildUserInfo } from 'test/generate';
import setDB from '../../db';

let db;
let user;

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await db.collection('users').deleteMany({});
}, 30000);

async function setup() {
  const database = setDB();
  db = await database;
  const { ops } = await db.collection('users').insertOne(buildUserInfo());
  user = ops[0];
}

describe('insertOne(): ', () => {
  it('inserts a new user given valid user info details', async () => {
    const testUser = buildUserInfo();
    const {
      signinMethod: { password: generatedPassword }
    } = testUser;
    const { inserted } = await userDB.insertOne(testUser);

    const dbCount = await db.collection('users').countDocuments();

    expect(dbCount).toEqual(2);
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
