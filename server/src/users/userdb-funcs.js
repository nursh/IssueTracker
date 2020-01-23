import { hashPassword } from '../helpers/password-helper';

export default function userDBFuncs(database) {
  return Object.freeze({
    findByEmail,
    findById,
    insertOne,
    findOne,
    deleteMany
  });

  async function findByEmail(email) {
    const db = await database;
    const user = await db.collection('users').findOne({ email });

    return user ? user : null;
  }

  async function findById(userId) {
    const db = await database;
    const user = await db.collection('users').findOne({ id: userId });

    return user ? user : null;
  }

  async function insertOne(user) {
    const db = await database;
    try {
      const newUser = { ...user };
      const { method } = newUser.signinMethod;

      if (method === 'local') {
        user.signinMethod.password = await hashPassword(
          user.signinMethod.password
        );
      }

      const { result, ops } = await db.collection('users').insertOne(user);

      return {
        success: result.ok === 1,
        inserted: ops[0]
      };
    } catch (error) {
      throw new Error(error);
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

  async function deleteMany() {
    const db = await database;
    try {
      await db.collection('users').deleteMany({});
    } catch (error) {
      console.error(error);
    }
  }
}
