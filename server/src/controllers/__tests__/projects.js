import { getProjectsController } from '../projects';
import * as projects from 'projects';
import { buildReq, buildRes } from 'test/generate';

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
