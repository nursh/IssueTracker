export default function userDB(db) {
  return Object.freeze({
    findByEmail
  });

  async function findByEmail(email) {
    const user = await db
      .collection('users')
      .findOne({ email }, { password: 1 });

    return user;
  }
}
