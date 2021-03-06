import passport from 'passport';

import { jwtLogin } from './passport-jwt';
import { localLogin } from './passport-local';
import { githubLogin } from './passport-github';
import { googleLogin } from './passport-google';

/* eslint-disable no-unused-vars */
const localPassport = passport.use(localLogin);
const jwtPassport = passport.use(jwtLogin);
const githubPassport = passport.use(githubLogin);
const googlePassport = passport.use(googleLogin);

const authOpts = opts => {
  return {
    ...opts,
    session: false
  };
};

const requireAuth = passport.authenticate('jwt', authOpts());
const useGithubSignin = passport.authenticate('github', authOpts());
const useGoogleSignin = passport.authenticate(
  'google',
  authOpts({ scope: ['profile', 'email'] })
);
const useGoogleAuth = passport.authenticate('google', authOpts());

export { requireAuth, useGithubSignin, useGoogleSignin, useGoogleAuth };
