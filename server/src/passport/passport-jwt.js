import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userDB } from '../users';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async function(
  tokenPayload,
  done
) {
  let user;
  try {
    user = await userDB.findById(tokenPayload.sub);
  } catch (error) {
    return done(error, false);
  }

  if (!user) return done(null, false);
  return done(null, user);
});

const jwtPassport = passport.use(jwtLogin);
export { jwtPassport };
