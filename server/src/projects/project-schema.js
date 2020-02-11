export async function createProjectSchema(database) {
  const db = await database;
  db.createCollection('projects', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'created_by', 'created_on'],
        properties: {
          title: {
            bsonType: 'string'
          },
          description: {
            bsonType: 'string'
          },
          created_on: {
            bsonType: 'date'
          },
          created_by: {
            bsonType: 'objectId'
          },
          team: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['id', 'name'],
              additionalProperties: false,
              properties: {
                id: {
                  bsonType: 'objectId'
                },
                name: {
                  bsonType: 'string'
                }
              }
            }
          }
        }
      }
    }
  });
}
