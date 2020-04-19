import {
  getProjectsController,
  deleteProjectController,
  createProjectController,
  updateProjectController
} from '../projects';
import * as projects from 'projects';
import * as issues from 'issues';
import ObjectID from 'bson-objectid';
import { ObjectId } from 'mongodb';
import { buildReq, buildRes, buildTestProject } from 'test/generate';

jest.mock('projects');
jest.mock('issues');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET projects: ', () => {
  it('Uses the text search query and returns projects', async () => {
    const searchTerm = 'Playing';
    const req = buildReq(
      {},
      {
        query: {
          search: searchTerm
        }
      }
    );
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

  it('uses the createdBy query and returns projects', async () => {
    const req = buildReq(
      {},
      {
        user: { _id: 'user-id' },
        query: {}
      }
    );
    const res = buildRes();

    /* eslint-disable */
    projects.projectDB.find.mockImplementation(query => []);

    await getProjectsController(req, res);
    expect(projects.projectDB.find).toHaveBeenCalledTimes(1);
    expect(projects.projectDB.find).toHaveBeenCalledWith({
      $or: [{ 'createdBy.id': req.user._id }, { 'team.id': req.user._id }]
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
  it('deletes a project given the same createdById and user._id', async () => {
    projects.projectDB.deleteOne.mockImplementation(query => {});
    issues.issueDB.deleteMany.mockImplementation(issueQuery => {});

    const projectId = ObjectId(ObjectID.generate());
    const req = buildReq(
      {},
      {
        user: { _id: 'user-id' },
        query: {
          projectId: projectId,
          createdById: 'user-id'
        }
      }
    );

    const res = buildRes();

    await deleteProjectController(req, res);

    expect(projects.projectDB.deleteOne).toHaveBeenCalledTimes(1);
    expect(projects.projectDB.deleteOne).toBeCalledWith({
      _id: projectId,
      'createdBy.id': 'user-id'
    });

    expect(issues.issueDB.deleteMany).toHaveBeenCalledTimes(1);
    expect(issues.issueDB.deleteMany).toBeCalledWith({
      project: projectId
    });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success'
    });
  });

  it('returns a 403 forbidden given different createdById and user._id', async () => {
    const projectId = ObjectId(ObjectID.generate());
    const req = buildReq(
      {},
      {
        user: { _id: 'user-id' },
        query: {
          projectId: projectId,
          createdById: 'user-id-1'
        }
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
  it('given valid inputs returns a 200 status with the inserted project', async () => {
    const project = buildTestProject();
    const user = {
      _id: 'user-id',
      name: 'user name'
    };
    const req = buildReq({ project }, { user });
    const res = buildRes();

    projects.buildProject.mockImplementation(project => project);
    projects.projectDB.insertOne.mockImplementation(project => ({
      success: true,
      inserted: project
    }));

    await createProjectController(req, res);

    const calledProject = {
      ...project,
      createdBy: {
        id: user._id,
        name: user.name
      }
    };
    expect(projects.buildProject).toBeCalledTimes(1);
    expect(projects.buildProject).toBeCalledWith({ ...calledProject });

    expect(projects.projectDB.insertOne).toBeCalledTimes(1);
    expect(projects.projectDB.insertOne).toBeCalledWith({ ...calledProject });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      project: calledProject
    });
  });

  it('responds with 422 when insert into database fails', async () => {
    const project = buildTestProject();
    const user = {
      _id: 'user-id',
      name: 'user name'
    };
    const req = buildReq({ project }, { user });
    const res = buildRes();

    projects.buildProject.mockImplementation(project => project);
    projects.projectDB.insertOne.mockImplementation(project => ({
      success: false,
      inserted: null
    }));

    await createProjectController(req, res);
    const calledProject = {
      ...project,
      createdBy: {
        id: user._id,
        name: user.name
      }
    };
    expect(projects.buildProject).toBeCalledTimes(1);
    expect(projects.buildProject).toBeCalledWith({ ...calledProject });

    expect(projects.projectDB.insertOne).toBeCalledTimes(1);
    expect(projects.projectDB.insertOne).toBeCalledWith({ ...calledProject });

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Could not create project.'
    });
  });
});

describe('UPDATE projects: ', () => {
  it('adds a user to a project when not part of team', async () => {
    const user = {
      _id: 'user-id',
      name: 'username'
    };
    const projectId = ObjectId(ObjectID.generate());

    const req = buildReq({ projectId }, { user });
    const res = buildRes();

    /* eslint-disable */
    projects.projectDB.addTeamMember.mockImplementation(
      (projectId, user) => {}
    );

    await updateProjectController(req, res);

    expect(projects.projectDB.addTeamMember).toBeCalledTimes(1);
    expect(projects.projectDB.addTeamMember).toBeCalledWith(projectId, {
      id: user._id,
      name: user.name
    });

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: 'success' });
  });
});
