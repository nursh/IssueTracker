import setDB from '../db';
import buildUser from './user';
import userDBFuncs from './userdb-funcs';

const userDB = userDBFuncs(setDB());

export { userDB, buildUser };
