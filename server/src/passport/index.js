import passport from 'passport';

import { jwtLogin } from './passport-jwt';
import { localLogin } from './passport-local';

/* eslint-disable no-unused-vars */
const localPassport = passport.use(localLogin);
const jwtPassport = passport.use(jwtLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export { requireAuth, requireSignin };
