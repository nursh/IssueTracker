import passport from 'passport';

import { jwtLogin } from './passport-jwt';
import { localLogin } from './passport-local';
import { githubLogin } from './passport-github';

/* eslint-disable no-unused-vars */
const localPassport = passport.use(localLogin);
const jwtPassport = passport.use(jwtLogin);
const githubPassport = passport.use(githubLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const useLocalSignin = passport.authenticate('local', { session: false });
const useGithubSignin = passport.authenticate('github', { session: false });

export { requireAuth, useLocalSignin, useGithubSignin };
