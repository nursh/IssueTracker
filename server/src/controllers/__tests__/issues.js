import {
  getIssuesController,
  createIssueController,
  deleteIssueController
} from '../issues';
import * as issues from 'issues';
import { buildReq, buildRes, buildTestIssue } from 'test/generate';
import ObjectID from 'bson-objectid';
import { ObjectId } from 'mongodb';

jest.mock('issues');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET issues: ', () => {
  it('returns a 400 when projectId is not included in the request body', async () => {
    const req = buildReq();
    const res = buildRes();

    /* eslint-disable */
    issues.issueDB.find.mockImplementation(query => []);
    await getIssuesController(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'ProjectId is required.'
    });
  });

  it('returns a 200 with an array given a valid projectId', async () => {
    const projectId = 'project-id';
    const req = buildReq({
      projectId
    });
    const res = buildRes();

    /* eslint-disable */
    issues.issueDB.find.mockImplementation(query => []);
    await getIssuesController(req, res);

    expect(issues.issueDB.find).toHaveBeenCalledTimes(1);
    expect(issues.issueDB.find).toHaveBeenCalledWith({ project: projectId });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      issues: []
    });
  });
});

describe('CREATE issue: ', () => {
  it('responds with 200 given valid issue info', async () => {
    const issue = buildTestIssue();
    const projectId = 'project-id';
    const user = {
      _id: 'user-id',
      name: 'user-name'
    };
    const req = buildReq({ issue, projectId }, { user });
    const res = buildRes();

    issues.buildIssue.mockImplementation(issue => issue);
    issues.issueDB.insertOne.mockImplementation(issue => ({
      success: true,
      inserted: issue
    }));

    await createIssueController(req, res);

    const validatedIssue = {
      ...issue,
      project: projectId,
      createdBy: {
        id: user._id,
        name: user.name
      }
    };

    expect(issues.buildIssue).toBeCalledTimes(1);
    expect(issues.buildIssue).toBeCalledWith({ ...validatedIssue });

    expect(issues.issueDB.insertOne).toBeCalledTimes(1);
    expect(issues.issueDB.insertOne).toBeCalledWith({ ...validatedIssue });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ issue: validatedIssue });
  });

  it('responds with 422 when insert into database fails', async () => {
    const issue = buildTestIssue();
    const projectId = 'project-id';
    const user = {
      _id: 'user-id',
      name: 'user-name'
    };
    const req = buildReq({ issue, projectId }, { user });
    const res = buildRes();

    issues.buildIssue.mockImplementation(issue => issue);
    /* eslint-disable */
    issues.issueDB.insertOne.mockImplementation(issue => ({
      success: false,
      inserted: null
    }));

    await createIssueController(req, res);

    const validatedIssue = {
      ...issue,
      project: projectId,
      createdBy: {
        id: user._id,
        name: user.name
      }
    };

    expect(issues.buildIssue).toBeCalledTimes(1);
    expect(issues.buildIssue).toBeCalledWith({ ...validatedIssue });

    expect(issues.issueDB.insertOne).toBeCalledTimes(1);
    expect(issues.issueDB.insertOne).toBeCalledWith({ ...validatedIssue });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Could not create issue.'
    });
  });
});

describe('DELETE issues: ', () => {
  it('deletes an issue given a valid issueId', async () => {
    issues.issueDB.deleteOne.mockImplementation(query => {});

    const issueId = ObjectId(ObjectID.generate());
    const req = buildReq({ issueId });
    const res = buildRes();

    await deleteIssueController(req, res);

    expect(issues.issueDB.deleteOne).toBeCalledTimes(1);
    expect(issues.issueDB.deleteOne).toBeCalledWith({ _id: issueId });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Success' });
  });

  it('responds with 400 when there is no issueId', async () => {
    issues.issueDB.deleteOne.mockImplementation(query => {});

    const req = buildReq();
    const res = buildRes();

    await deleteIssueController(req, res);

    expect(issues.issueDB.deleteOne).toBeCalledTimes(0);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'IssueId is required' });
  });
});