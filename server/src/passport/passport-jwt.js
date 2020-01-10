import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { userDB } from '../users';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async (tokenPayload, done) => {
  try {
    const user = await userDB.findById(tokenPayload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export { jwtLogin };
