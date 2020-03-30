import buildProject from '../project';
import { buildTestProject } from 'test/generate';
import * as projectValidation from 'helpers/project-validation';

jest.mock('helpers/project-validation', () => ({
  validateProject: jest.fn(projectInfo => projectInfo)
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('buildProject(): ', () => {
  it('returns a project given valid inputs', () => {
    const projectInfo = buildTestProject();
    const { validateProject } = projectValidation;

    const project = buildProject(projectInfo);
    expect(validateProject).toHaveBeenCalledTimes(1);
    expect(validateProject).toHaveBeenCalledWith(projectInfo);

    expect(project).toEqual(projectInfo);
  });
});
