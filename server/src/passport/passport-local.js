import LocalStrategy from 'passport-local';

import { userDB } from '../users';
import { passwordMatches } from '../helpers/password-helper';

const localOpts = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await userDB.findByEmail(email);

      if (!user) {
        return done(null, false, { message: 'User does not exist.' });
      }

      if (passwordMatches(user.password, password)) {
        return done(null, user);
      }
    } catch (error) {
      return done(error, false);
    }
  }
);

export { localLogin };
