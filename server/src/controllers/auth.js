import { userDB, buildUser } from 'users';
import { signToken } from '../helpers/jwt-helper';

export async function signupController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        error: 'Email and Password fields must be provided.'
      });
    }

    const existingUser = await userDB.findByEmail(email);
    if (existingUser) {
      return res.status(422).json({ error: 'Email is in use' });
    }

    const user = buildUser({
      email,
      signinMethod: {
        method: 'local',
        password
      }
    });

    const { success } = await userDB.insertOne(user);
    if (success) {
      res.status(201).json({ token: signToken(user) });
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function signinController(req, res) {
  res.status(200).json({ token: signToken(req.user) });
}

export function githubController(req, res) {
  res.status(200).json({ token: signToken(req.user) });
}

export function googleController(req, res) {
  res.status(200).json({ token: signToken(req.user) });
}
