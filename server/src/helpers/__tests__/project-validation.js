import { validateProject, validateTitle } from '../project-validation';
import { buildTestProject } from 'test/generate';

describe('validateTitle(): ', () => {
  it('throws an error when title has less than 6 characters', () => {
    const title = 'title';
    expect(() => validateTitle(title)).toThrowErrorMatchingInlineSnapshot(
      `"Title must be at least 6 characters long"`
    );
  });

  it('does not throw error on valid title', () => {
    const title = 'New project';
    expect(() => validateTitle(title)).not.toThrowError();
  });
});

describe('validateProject(): ', () => {
  it('throws an error when title is missing', () => {
    const project = buildTestProject({ title: false });
    expect(() => validateProject(project)).toThrowErrorMatchingInlineSnapshot(
      `"title is required, cannot be null or undefined."`
    );
  });

  it('throws an error when createdBy is missing', () => {
    const project = buildTestProject({ createdBy: false });
    expect(() => validateProject(project)).toThrowErrorMatchingInlineSnapshot(
      `"createdBy is required, cannot be null or undefined."`
    );
  });

  it('should not throw error when project object is valid', () => {
    const project = buildTestProject();
    expect(() => validateProject(project)).not.toThrowError();
  });
});
