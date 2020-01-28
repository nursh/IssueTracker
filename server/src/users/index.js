import setDB from '../db';
import buildUser from './user';
import userDBFuncs from './userdb-funcs';
import { createUserSchema } from './user-schema';

const database = setDB();

if (process.env.NODE_ENV !== 'test') {
  createUserSchema(database);
}
const userDB = userDBFuncs(database);

export { userDB, buildUser };
