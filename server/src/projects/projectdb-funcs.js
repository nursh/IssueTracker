export default function projectDBFuncs(database) {
  return Object.freeze({
    insertOne,
    find,
    deleteOne,
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
      const projects = await db.collection('projects').find(query);
      return projects ? projects : null;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOne(query) {
    const db = await database;
    try {
      await db.collection('projects').deleteOne(query);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTeamMember(projectId, user) {
    const db = await database;
    try {
      await db
        .collection('projects')
        .update({ _id: projectId }, { $push: { team: user } });
    } catch (error) {
      console.error(error);
    }
  }
}
