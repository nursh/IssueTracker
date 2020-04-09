import { userDB, buildUser } from 'users';
import passport from 'passport';
import { signToken } from '../helpers/jwt-helper';

export async function signupController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({
        error: 'Name, Email and Password fields must be provided.'
      });
    }

    const existingUser = await userDB.findByEmail(email);
    if (existingUser) {
      return res.status(422).json({ error: 'Email is in use' });
    }

    const user = buildUser({
      name,
      email,
      signupMethod: 'local',
      local: {
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
  passport.authenticate('local', function(err, user, info) {
    if (err) throw new Error(err);
    if (!user) {
      const { message } = info;
      return res.status(401).json({ message });
    }

    return res.status(200).json({ token: signToken(user) });
  })(req, res);
}

export function githubController(req, res) {
  res.status(200).json({ token: signToken(req.user) });
}

export function googleController(req, res) {
  res.status(200).json({ token: signToken(req.user) });
}
