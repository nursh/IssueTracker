import { projectDB } from '../index';
import { buildTestProject } from 'test/generate';

let project;

beforeAll(async () => {
  const { inserted } = await projectDB.insertOne(buildTestProject());
  project = inserted;
});

afterAll(async () => {
  await projectDB.delete({});
});

describe('insertOne(): ', () => {
  it('inserts a new project given valid project details', async () => {
    const testProject = buildTestProject();

    const { inserted } = await projectDB.insertOne(testProject);
    expect(inserted.title).toBe(testProject.title);
  });
});

describe('find(): ', () => {
  it('returns a project when filtered by an existing userId', async () => {
    const userId = project.createdBy.id;
    const result = await projectDB.find({ 'createdBy.id': userId });

    expect(result.length).toEqual(1);
    expect(result[0].createdBy.id).toBe(userId);
  });

  it('returns null, when a project does not exist with a userId', async () => {
    const userId = 'fakeId';
    const result = await projectDB.find({ 'createdBy.id': userId });

    expect(result).toBeNull();
  });
});

describe('remove(): ', () => {
  it('removes an existing project', async () => {
    const testProject = buildTestProject();
    const { title } = testProject;

    await projectDB.delete({ title });

    const result = await projectDB.find({ title });
    expect(result).toBeNull();
  });
});

describe('addTeamMember(): ', () => {
  it('adds a team member', async () => {
    const teamMember = {
      id: 'some-user-id',
      name: 'Johnny Gudhonson'
    };

    const { _id } = project;
    await projectDB.addTeamMember(_id, teamMember);

    const result = await projectDB.find({ _id });
    expect(result[0].team.length).toEqual(1);
  });
});
