import setDB from '../db';
import buildIssue from './issue';
import issueDBFuncs from './issuedb-funcs';
import { createIssueSchema } from './issue-schema';

const database = setDB();
if (process.env.NODE_ENV !== 'test') {
  createIssueSchema(database);
}

const issueDB = issueDBFuncs(database);
export { issueDB, buildIssue };
