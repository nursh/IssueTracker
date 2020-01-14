import buildUser from './user';
import { hashPassword } from '../helpers/password-helper';

export default function userDBFuncs(database) {
  return Object.freeze({
    findByEmail,
    findById,
    insertOne,
    findOne
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
      const { method } = user.signinMethod;
      if (method === 'local') {
        user.signinMethod.password = await hashPassword(
          user.signinMethod.password
        );
      }

      const { result, ops } = await db.collection('users').insertOne(user);

      return {
        success: result.ok === 1,
        inserted: documentToUser(ops[0])
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function findOne(query) {
    const db = await database;
    try {
      const user = await db.collection('users').findOne(query);

      return user ? documentToUser(user) : null;
    } catch (error) {
      console.error(error);
    }
  }

  function documentToUser(doc) {
    return buildUser(doc, true);
  }
}
