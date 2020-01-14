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
      const existingUser = await userDB.findByEmail(email);

      if (!existingUser) {
        return done(null, false, { message: 'User does not exist.' });
      }

      const { password: userPassword } = existingUser.signinMethod;
      if (passwordMatches(userPassword, password)) {
        return done(null, existingUser);
      }
    } catch (error) {
      return done(error, false);
    }
  }
);

export { localLogin };
