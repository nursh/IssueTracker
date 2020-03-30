import cases from 'jest-in-case';

import {
  validateIssue,
  validatePriority,
  validateProgress,
  validateStatus
} from '../issue-validation';
import { buildTestIssue } from 'test/generate';

describe('validateStatus(): ', () => {
  it('should throw an error when an invalid status is passed', () => {
    const invalidStatus = 'INVALID';
    expect(() =>
      validateStatus(invalidStatus)
    ).toThrowErrorMatchingInlineSnapshot(`"Status value is not valid."`);
  });

  it('should not throw an error when a valid status is passed', () => {
    const validStatus = 'OPEN';
    expect(() => validateStatus(validStatus)).not.toThrowError();
  });
});

describe('validateProgress(): ', () => {
  it('should throw an error when an invalid progress is passed', () => {
    const invalidProgress = 'INVALID';
    expect(() =>
      validateProgress(invalidProgress)
    ).toThrowErrorMatchingInlineSnapshot(`"Progress value is not valid."`);
  });

  it('should not throw an error when a valid progress is passed', () => {
    const validProgress = 'IN PROGRESS';
    expect(() => validateProgress(validProgress)).not.toThrowError();
  });
});

describe('validatePriority(): ', () => {
  it('should throw an error when an invalid priority is passed', () => {
    const invalidPriority = 'INVALID';
    expect(() =>
      validatePriority(invalidPriority)
    ).toThrowErrorMatchingInlineSnapshot(`"Priority value is not valid."`);
  });

  it('should not throw an error when a valid priority is passed', () => {
    const validPriority = 'HIGH';
    expect(() => validatePriority(validPriority)).not.toThrowError();
  });
});

function casifyIssues(obj) {
  return Object.entries(obj).map(([name, issue]) => ({
    name: `Issue with ${name}`,
    issue
  }));
}

cases(
  'validateIssue() - missing arguments should throw error',
  ({ issue }) => {
    expect(() => validateIssue(issue)).toThrowError();
  },
  casifyIssues({
    'missing title': buildTestIssue({ title: false }),
    'missing project': buildTestIssue({ project: false }),
    'missing progress': buildTestIssue({ progress: false }),
    'missing status': buildTestIssue({ status: false }),
    'missing priority': buildTestIssue({ priority: false }),
    'missing createdBy': buildTestIssue({ createdBy: false })
  })
);

describe('validateIssue() - ', () => {
  it('validateIssue() - should not throw an error when a valid issue is passed', () => {
    expect(() => validateIssue(buildTestIssue())).not.toThrowError();
  });
});
