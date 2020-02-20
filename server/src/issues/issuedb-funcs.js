export default function issueDBFuncs(database) {
  return Object.freeze({
    find,
    delete: remove,
    insertOne,
    updateOne
  });

  async function insertOne(issue) {
    const db = await database;
    try {
      const { result, ops } = await db.collection('issues').insertOne(issue);
      return {
        success: result.ok === 1,
        inserted: ops[0]
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function find(query) {
    const db = await database;
    try {
      const issues = await db
        .collection('issues')
        .find(query)
        .toArray();
      return issues.length > 0 ? issues : null;
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(query) {
    const db = await database;
    try {
      await db.collection('issues').deleteMany(query);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOne(issueId, query) {
    const db = await database;
    try {
      const result = await db
        .collection('issues')
        .findOneAndUpdate({ _id: issueId }, query, { returnOriginal: false });
      return {
        updated: result.value
      };
    } catch (error) {
      console.error(error);
    }
  }
}
