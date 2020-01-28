import request from 'supertest';
import { app } from '../../app';
import { localLoginForm, buildUserInfo } from 'test/generate';
import { userDB } from 'users';

let user;

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await userDB.deleteMany();
});

async function setup() {
  user = buildUserInfo();
  const {
    signinMethod: { password }
  } = user;
  await userDB.insertOne(user);
  user.signinMethod.password = password;
}

describe('/auth/signup', () => {
  test('signs up a user when userInfo is valid and returns a token', async () => {
    const newUser = localLoginForm();
    const response = await request(app)
      .post('/auth/signup')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('responds with an error when the user already exists', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(user);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "error": "Name, Email and Password fields must be provided.",
      }
    `);
  });

  test('responds with an error when signing up with incomplete details', async () => {
    const incompleteUser = localLoginForm({ email: false });

    const response = await request(app)
      .post('/auth/signup')
      .send(incompleteUser);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "error": "Name, Email and Password fields must be provided.",
      }
    `);
  });
});

describe('/auth/signin', () => {
  test('responds with an error when signing in with incomplete details', async () => {
    const { email } = user;
    const incompleteUser = { email };

    const response = await request(app)
      .post('/auth/signin')
      .send(incompleteUser);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchInlineSnapshot(`Object {}`);
  });

  test('responds with an error when a user does not exist', async () => {
    const newUser = localLoginForm();
    const response = await request(app)
      .post('/auth/signin')
      .send(newUser);

    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchInlineSnapshot(`Object {}`);
  });

  test('responds with an error when an existing user tries to sign in with the wrong password', async () => {
    const userDetails = {
      email: user.email,
      password: 'Wrong password'
    };

    const response = await request(app)
      .post('/auth/signin')
      .send(userDetails);

    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchInlineSnapshot(`Object {}`);
  });

  test('responds with a token, given an existing user with valid signin details', async () => {
    const {
      email,
      signinMethod: { password }
    } = user;
    const userDetails = { email, password };

    const response = await request(app)
      .post('/auth/signin')
      .send(userDetails);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
