import { hashPassword } from '../helpers/password-helper';

export default function userDBFuncs(database) {
  return Object.freeze({
    findByEmail,
    findById,
    insertOne,
    findOne,
    delete: remove
  });

  async function findByEmail(email) {
    const db = await database;
    const user = await db.collection('users').findOne({ email });

    return user ? user : null;
  }

  async function findById(userId) {
    const db = await database;
    const user = await db.collection('users').findOne({ _id: userId });

    return user ? user : null;
  }

  async function insertOne(user) {
    const db = await database;
    try {
      const { signupMethod } = user;

      if (signupMethod === 'local') {
        const {
          local: { password }
        } = user;
        user.local.password = await hashPassword(password);
      }

      const { result, ops } = await db.collection('users').insertOne(user);

      return {
        success: result.ok === 1,
        inserted: ops[0]
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function findOne(query) {
    const db = await database;
    try {
      const user = await db.collection('users').findOne(query);

      return user ? user : null;
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(query) {
    const db = await database;
    try {
      await db.collection('users').deleteMany(query);
    } catch (error) {
      console.error(error);
    }
  }
}
