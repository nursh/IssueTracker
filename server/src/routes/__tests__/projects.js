import request from 'supertest';
import { app } from '../../app';
import { userDB } from 'users';
import { projectDB } from 'projects';
import { localSignupForm, buildTestProject } from 'test/generate';

let token, tokenTwo, project, projectToDelete;

beforeAll(async () => {
  const user = localSignupForm();
  const userTwo = localSignupForm();

  const projectOne = buildTestProject();
  const projectTwo = buildTestProject();
  const projectThree = buildTestProject();
  const projectFour = buildTestProject();

  const response = await request(app)
    .post('/auth/signup')
    .send(user);

  const responseTwo = await request(app)
    .post('/auth/signup')
    .send(userTwo);

  token = response.body.token;
  tokenTwo = responseTwo.body.token;

  const responseProjectOne = await request(app)
    .post('/api/projects')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({ project: projectOne });

  project = responseProjectOne.body.project;

  const responseProjectTwo = await request(app)
    .post('/api/projects')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({ project: projectTwo });

  projectToDelete = responseProjectTwo.body.project;

  const responseProjectThree = await request(app)
    .post('/api/projects')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenTwo)
    .send({ project: projectThree });

  await request(app)
    .post('/api/projects')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenTwo)
    .send({ project: projectFour });

  await request(app)
    .put('/api/projects')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({
      projectId: responseProjectThree.body.project._id
    });
});

afterAll(async () => {
  await userDB.delete({});
  await projectDB.deleteMany({});
});

describe('GET: /api/projects', () => {
  it('fetches all projects for a user given valid token', async () => {
    const response = await request(app)
      .get('/api/projects')
      .set('Authorization', token);

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          projects: expect.any(Array)
        }
      })
    );

    expect(response.body.projects).toHaveLength(3);
  });

  it('fetches a project by a search query', async () => {
    const { title } = project;
    const searchQuery = title.split(' ')[0];

    const response = await request(app)
      .get('/api/projects')
      .set('Authorization', tokenTwo)
      .query({ search: searchQuery });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          projects: expect.any(Array)
        }
      })
    );

    expect(response.body.projects).not.toHaveLength(0);
  });
});

describe('DELETE: /api/projects: ', () => {
  it('deletes a project, using the createdBy user of the project', async () => {
    const {
      createdBy: { id: createdById },
      _id
    } = projectToDelete;

    const response = await request(app)
      .delete('/api/projects')
      .set('Authorization', token)
      .send({
        createdById,
        projectId: _id
      });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          message: 'success'
        }
      })
    );

    const confirmDeleteResponse = await request(app)
      .get('/api/projects')
      .set('Authorization', token);

    expect(confirmDeleteResponse).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          projects: expect.any(Array)
        }
      })
    );

    expect(confirmDeleteResponse.body.projects).toHaveLength(2);
  });

  it('does not delete project, given a user did not create the project', async () => {
    const {
      createdBy: { id: createdById },
      _id
    } = project;

    const response = await request(app)
      .delete('/api/projects')
      .set('Authorization', tokenTwo)
      .send({
        createdById,
        projectId: _id
      });

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

describe('CREATE /api/project: ', () => {
  it('creates a project given valid details', async () => {
    const project = buildTestProject();
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', token)
      .send({
        project
      });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          project: expect.objectContaining({
            title: project.title,
            description: project.description
          })
        }
      })
    );
  });
});

describe('UPDATE /api/projects: ', () => {
  it('adds a user to the team of a project', async () => {
    const response = await request(app)
      .put('/api/projects')
      .set('Content-Type', 'application/json')
      .set('Authorization', tokenTwo)
      .send({
        projectId: project._id
      });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          message: 'success'
        }
      })
    );

    const confirmUpdateResponse = await request(app)
      .get('/api/projects')
      .set('Authorization', tokenTwo);

    expect(confirmUpdateResponse).toEqual(
      expect.objectContaining({
        status: 200,
        body: {
          projects: expect.any(Array)
        }
      })
    );

    expect(confirmUpdateResponse.body.projects).toHaveLength(3);
  });
});
