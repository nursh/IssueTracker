import { userDB, buildUser } from '../users';

async function signupController(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await userDB.findByEmail(email);

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = buildUser({
      email,
      password,
      signinMethod: 'local'
    });

    const { success, insertedUser } = await userDB.insertOne(user);
    if (success) {
      res.send({ user: insertedUser });
    }
  } catch (error) {
    console.log(error);
  }
}

export { signupController };
