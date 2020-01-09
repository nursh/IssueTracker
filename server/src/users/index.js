import initDb from '../db';
import buildUser from './user';
import userDBFuncs from './userdb-funcs';

async function setDB() {
  const database = await initDb();
  return database;
}

const userDB = userDBFuncs(setDB());

export { userDB, buildUser };
