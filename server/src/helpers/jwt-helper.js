import jwt from 'jsonwebtoken';

export function signToken(user) {
  const createdTimestamp = new Date().getTime();
  const token = jwt.sign(
    {
      iss: 'Issue Tracker',
      sub: user.id,
      iat: createdTimestamp
    },
    process.env.JWT_SECRET
  );
  return token;
}
