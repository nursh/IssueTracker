import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ObjectId } from 'mongodb';
import { userDB } from '../users';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async (tokenPayload, done) => {
  try {
    const userId = ObjectId(tokenPayload.sub);
    const user = await userDB.findById(userId);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export { jwtLogin };
