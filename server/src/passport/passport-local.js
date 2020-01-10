import LocalStrategy from 'passport-local';

import { userDB } from '../users';
import { passwordMatches } from '../helpers/password-helper';

const localOpts = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOpts, async function(
  email,
  password,
  done
) {
  let user;
  try {
    user = await userDB.findByEmail(email);
  } catch (error) {
    return done(error, false);
  }

  if (!user) return done(null, false, { message: 'User does not exist.' });

  if (passwordMatches(user.password, password)) return done(null, user);
});

export { localLogin };
