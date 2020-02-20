import {
  statusValues,
  priorityValues,
  progressValues
} from 'helpers/issue-schema-enums';

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
            enum: priorityValues
          },
          status: {
            enum: statusValues
          },
          progress: {
            enum: progressValues
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
