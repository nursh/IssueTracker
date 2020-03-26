import {
  getProjectsController,
  deleteProjectController,
  createProjectController
} from '../projects';
import * as projects from 'projects';
import ObjectID from 'bson-objectid';
import { ObjectId } from 'mongodb';
import { buildReq, buildRes, buildTestProject } from 'test/generate';

jest.mock('projects');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET projects: ', () => {
  test('Uses the text search query and returns projects', async () => {
    const searchTerm = 'Playing';
    const req = buildReq({
      search: searchTerm
    });
    const res = buildRes();

    /* eslint-disable */
    projects.projectDB.find.mockImplementation(query => []);
    await getProjectsController(req, res);

    expect(projects.projectDB.find).toHaveBeenCalledTimes(1);
    expect(projects.projectDB.find).toHaveBeenCalledWith({
      $text: {
        $search: searchTerm
      }
    });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      projects: []
    });
  });

  test('uses the createdBy query and returns projects', async () => {
    const req = buildReq(
      {},
      {
        user: { _id: 'user-id' }
      }
    );
    const res = buildRes();

    /* eslint-disable */
    projects.projectDB.find.mockImplementation(query => []);

    await getProjectsController(req, res);
    expect(projects.projectDB.find).toHaveBeenCalledTimes(1);
    expect(projects.projectDB.find).toHaveBeenCalledWith({
      'createdBy.id': req.user._id
    });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      projects: []
    });
  });
});

describe('DELETE projects: ', () => {
  test('deletes a project given the same createdById and user._id', async () => {
    projects.projectDB.deleteOne.mockImplementation(query => {});

    const projectId = ObjectId(ObjectID.generate());
    const req = buildReq(
      {
        projectId: projectId,
        createdById: 'user-id'
      },
      {
        user: { _id: 'user-id' }
      }
    );

    const res = buildRes();

    await deleteProjectController(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success'
    });
  });

  test('returns a 403 forbidden given different createdById and user._id', async () => {
    const projectId = ObjectId(ObjectID.generate());
    const req = buildReq(
      {
        projectId: projectId,
        createdById: 'user-id-1'
      },
      {
        user: { _id: 'user-id' }
      }
    );

    const res = buildRes();

    await deleteProjectController(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User not allowed to delete project'
    });
  });
});

describe('CREATE projects: ', () => {
  test('given valid inputs returns a 200 status with the inserted project', async () => {
    const project = buildTestProject();
    const req = buildReq({ project });
    const res = buildRes();

    projects.buildProject.mockImplementation(project => project);
    projects.projectDB.insertOne.mockImplementation(project => ({
      success: true,
      inserted: project
    }));

    await createProjectController(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: project
    });
  });

  test('responds with 422 when insert into database fails', async () => {
    const project = buildTestProject();
    const req = buildReq({ project });
    const res = buildRes();

    projects.buildProject.mockImplementation(project => project);
    projects.projectDB.insertOne.mockImplementation(project => ({
      success: false,
      inserted: null
    }));

    await createProjectController(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Could not create project.'
    });
  });
});
