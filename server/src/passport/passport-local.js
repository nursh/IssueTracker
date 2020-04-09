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
        return done(null, false, {
          message: 'Error: This user does not exist.'
        });
      }

      const {
        local: { password: userPassword }
      } = existingUser;
      const isMatch = await passwordMatches(userPassword, password);
      if (isMatch) {
        return done(null, existingUser);
      }

      return done(null, false, {
        message: 'Error: Email or Password is incorrect.'
      });
    } catch (error) {
      return done(error, false);
    }
  }
);

export { localLogin };
