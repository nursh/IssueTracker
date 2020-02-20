export default function projectDBFuncs(database) {
  return Object.freeze({
    insertOne,
    find,
    delete: remove,
    addTeamMember
  });

  async function insertOne(project) {
    const db = await database;
    try {
      const { result, ops } = await db
        .collection('projects')
        .insertOne(project);
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
      const projects = await db
        .collection('projects')
        .find(query)
        .toArray();
      return projects.length > 0 ? projects : null;
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(query) {
    const db = await database;
    try {
      await db.collection('projects').deleteMany(query);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTeamMember(projectId, user) {
    const db = await database;
    try {
      await db
        .collection('projects')
        .updateOne({ _id: projectId }, { $push: { team: user } });
    } catch (error) {
      console.error(error);
    }
  }
}
