import buildUser from './user';
import { hashPassword } from '../helpers/password-helper';

export default function userDBFuncs(database) {
  return Object.freeze({
    findByEmail,
    findById,
    insertOne
  });

  async function findByEmail(email) {
    const db = await database;
    const user = await db.collection('users').findOne({ email });

    return user;
  }

  async function findById(userId) {
    const db = await database;
    const user = await db.collection('users').findOne({ id: userId });

    return user ? documentToUser(user) : null;
  }

  async function insertOne(user) {
    const db = await database;
    try {
      if (user.signinMethod === 'local') {
        user.password = await hashPassword(user.password);
      }
      const { result } = await db.collection('users').insertOne(user);
      return {
        success: result.ok === 1
      };
    } catch (error) {
      throw console.log(error);
    }
  }

  function documentToUser(doc) {
    return buildUser(doc, true);
  }
}
