import request from 'supertest';
import { app } from '../../app';
import { userDB } from 'users';
import { projectDB } from 'projects';
import { issueDB } from 'issues';
import {
  localSignupForm,
  buildTestProject,
  buildTestIssue
} from 'test/generate';

let token, issuesProject, issueToDelete, issueToUpdate;

beforeAll(async () => {
  const user = localSignupForm();
  const project = buildTestProject();

  const issueOne = buildTestIssue();
  const issueTwo = buildTestIssue();
  const issueThree = buildTestIssue();

  const response = await request(app)
    .post('/auth/signup')
    .send(user);

  token = response.body.token;

  const resProject = await request(app)
    .post('/api/projects')
    .set('Authorization', token)
    .send({ project });

  issuesProject = resProject.body.project;

  const resIssueToDelete = await request(app)
    .post('/api/issues')
    .set('Authorization', token)
    .send({ projectId: issuesProject._id, issue: issueOne });

  issueToDelete = resIssueToDelete.body.issue;

  const resIssueToUpdate = await request(app)
    .post('/api/issues')
    .set('Authorization', token)
    .send({ projectId: issuesProject._id, issue: issueTwo });

  issueToUpdate = resIssueToUpdate.body.issue;

  await request(app)
    .post('/api/issues')
    .set('Authorization', token)
    .send({ projectId: issuesProject._id, issue: issueThree });
});

afterAll(async () => {
  await userDB.delete({});
  await projectDB.deleteMany({});
  await issueDB.deleteMany({});
});

describe('GET: /api/issues', () => {
  it('fetches all issues related to a project', async () => {
    const response = await request(app)
      .get('/api/issues')
      .set('Authorization', token)
      .query({ projectId: issuesProject._id });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          issues: expect.any(Array)
        }
      })
    );

    expect(response.body.issues).toHaveLength(3);
  });

  it('returns a 4xx error when no projectId is not given', async () => {
    const response = await request(app)
      .get('/api/issues')
      .set('Authorization', token);

    expect(response).toEqual(
      expect.objectContaining({
        status: 400,
        body: {
          message: expect.any(String)
        }
      })
    );
  });
});

describe('CREATE: /api/issues', () => {
  it('creates a new issue given valid issueInfo', async () => {
    const issue = buildTestIssue();
    const response = await request(app)
      .post('/api/issues')
      .set('Authorization', token)
      .send({
        projectId: issuesProject._id,
        issue
      });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          issue: expect.objectContaining({
            title: issue.title,
            description: issue.description
          })
        }
      })
    );
  });
});

describe('UPDATE /api/issues: ', () => {
  it('updates an existing issue', async () => {
    const updates = {
      priority: 'MEDIUM',
      progress: 'DONE',
      title: 'This is the updated issue'
    };
    const issue = Object.assign({}, issueToUpdate, updates);
    const response = await request(app)
      .put('/api/issues')
      .set('Authorization', token)
      .send({ issue });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          issue: expect.objectContaining({
            priority: updates.priority,
            progress: updates.progress,
            title: updates.title
          })
        }
      })
    );
  });
});

describe('DELETE /api/issues: ', () => {
  it('deletes an issue given a valid issue id', async () => {
    const response = await request(app)
      .delete('/api/issues')
      .set('Authorization', token)
      .query({ issueId: issueToDelete._id });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          message: expect.any(String)
        }
      })
    );

    const confirmDeleteResponse = await request(app)
      .get('/api/issues')
      .set('Authorization', token)
      .query({ projectId: issuesProject._id });

    expect(confirmDeleteResponse).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          issues: expect.any(Array)
        }
      })
    );

    expect(confirmDeleteResponse.body.issues).toHaveLength(3);
  });

  it('returns a 4xx when no issueId is given', async () => {
    const response = await request(app)
      .delete('/api/issues')
      .set('Authorization', token);

    expect(response).toEqual(
      expect.objectContaining({
        status: 403,
        body: {
          message: expect.any(String)
        }
      })
    );
  });
});
