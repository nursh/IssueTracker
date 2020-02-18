export default function issueDBFuncs(database) {
  return Object.freeze({
    find,
    deleteOne,
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
      const issues = await db.collection('issues').find(query);
      return issues ? issues : null;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOne(query) {
    const db = await database;
    try {
      await db.collection('issues').deleteOne(query);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOne(issueId, query) {
    const db = await database;
    try {
      await db.collection('issues').update({ _id: issueId }, query);
    } catch (error) {
      console.error(error);
    }
  }
}
