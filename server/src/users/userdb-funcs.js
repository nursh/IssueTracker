export default function userDBFuncs(database) {
  return Object.freeze({
    findByEmail,
    findById,
    insertOne
  });

  async function findByEmail(email) {
    const db = await database;
    const user = await db
      .collection('users')
      .findOne({ email }, { password: 1 });

    return user;
  }

  async function findById(userId) {
    const db = await database;
    const user = await db.collection('users').findOne({ id: userId });

    return user ? user : null;
  }

  async function insertOne(user) {
    const db = await database;
    try {
      const { ops, result } = await db.collection('users').insertOne(user);

      return {
        success: result.ok === 1,
        insertedUser: ops[0]
      };
    } catch (error) {
      throw console.log(error);
    }
  }
}
