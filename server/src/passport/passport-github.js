import { Strategy as GithubStrategy } from 'passport-github';

import { userDB, buildUser } from '../users';

const githubOpts = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: 'user:email'
};

const githubLogin = new GithubStrategy(
  githubOpts,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userDB.findOne({
        githubId: profile.id
      });

      if (user) {
        return done(null, user);
      }

      const email = profile.emails.find(email => email.primary);

      const newUser = buildUser({
        signinMethod: 'github',
        email: email.value,
        githubId: profile.id
      });
      const { success, inserted: insertedUser } = await userDB.insertOne(
        newUser
      );
      if (success) {
        return done(null, insertedUser);
      }
    } catch (error) {
      return done(error, null);
    }
  }
);

export { githubLogin };
