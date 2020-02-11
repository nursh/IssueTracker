export async function createUserSchema(database) {
  const db = await database;
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'name', 'signupMethod'],
        properties: {
          name: {
            bsonType: 'string'
          },
          email: {
            bsonType: 'string'
          },
          signupMethod: {
            enum: ['local', 'google', 'github']
          },
          local: {
            bsonType: 'object',
            required: ['password'],
            properties: {
              password: {
                bsonType: 'string'
              }
            }
          },
          google: {
            bsonType: 'object',
            required: ['googleId'],
            properties: {
              googleId: {
                bsonType: 'string'
              }
            }
          },
          github: {
            bsonType: 'object',
            required: ['githubId'],
            properties: {
              githubId: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  });
}
