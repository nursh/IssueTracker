export async function createIssueSchema(database) {
  const db = await database;
  db.createCollection('issues', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'title',
          'createdOn',
          'priority',
          'status',
          'progress',
          'createdBy',
          'project'
        ],
        properties: {
          title: {
            bsonType: 'string'
          },
          description: {
            bsonType: 'string'
          },
          project: {
            bsonType: 'objectId'
          },
          createdOn: {
            bsonType: 'date'
          },
          priority: {
            enum: ['HIGH', 'MEDIUM', 'LOW']
          },
          status: {
            enum: ['OPEN', 'CLOSED']
          },
          progress: {
            enum: ['backlog', 'in progress', 'done']
          },
          createdBy: {
            bsonType: 'object',
            required: ['id', 'name'],
            properties: {
              id: 'objectId',
              name: 'string'
            }
          }
        }
      }
    }
  });
}
