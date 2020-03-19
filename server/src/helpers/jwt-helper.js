import jwt from 'jsonwebtoken';

export function signToken(user) {
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'Issue Tracker'
  });
  return token;
}
