export async function createProjectSchema(database) {
  const db = await database;
  db.createCollection('projects', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'created_by', 'created_on', 'team'],
        properties: {
          title: {
            bsonType: 'string'
          },
          description: {
            bsonType: 'string'
          },
          createdOn: {
            bsonType: 'date'
          },
          createdBy: {
            bsonType: 'object',
            required: ['id', 'name'],
            properties: {
              id: 'string',
              name: 'string'
            }
          },
          team: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['id', 'name'],
              additionalProperties: false,
              properties: {
                id: {
                  bsonType: 'string'
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

  db.collection('projects').createIndex({
    title: 'text'
  });
}
