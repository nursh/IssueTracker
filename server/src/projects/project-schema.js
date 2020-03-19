export async function createProjectSchema(database) {
  try {
    const db = await database;
    db.createCollection('projects', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'createdBy', 'createdOn', 'team'],
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
                id: {
                  bsonType: 'string'
                },
                name: {
                  bsonType: 'string'
                }
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
  } catch (error) {
    console.error(error);
  }
}
