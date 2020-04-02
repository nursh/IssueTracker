import { getIssuesController } from '../issues';
import * as issues from 'issues';
/* eslint-disable */
import { buildReq, buildRes, buildTestIssue } from 'test/generate';

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
