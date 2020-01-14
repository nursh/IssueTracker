import { requiredParam } from '../helpers/required-param';
import { validateUser, normalizeUser } from 'helpers/user-validation';

export default function buildUser(userInfo = requiredParam('userInfo')) {
  const validUser = validateUser(userInfo);
  const user = normalizeUser(validUser);

  return user;
}
