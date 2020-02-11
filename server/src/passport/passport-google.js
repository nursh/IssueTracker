import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { userDB, buildUser } from '../users';

const googleOpts = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};

const googleLogin = new GoogleStrategy(
  googleOpts,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userDB.findOne({
        'google.googleId': profile.id
      });

      if (user) {
        return done(null, user);
      }

      const newUser = buildUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        signupMethod: 'google',
        google: {
          googleId: profile.id
        }
      });
      const { success, inserted: insertedUser } = await userDB.insertOne(
        newUser
      );
      if (success) {
        return done(null, insertedUser);
      }
      return done(null, false);
    } catch (error) {
      return done(error, null);
    }
  }
);

export { googleLogin };
