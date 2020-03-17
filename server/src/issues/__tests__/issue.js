import buildIssue from '../issue';
import { buildTestIssue } from 'test/generate';
import * as issueValidation from 'helpers/issue-validation';

jest.mock('helpers/issue-validation', () => ({
  validateIssue: jest.fn(issueInfo => issueInfo)
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('buildIssue(): ', () => {
  test('returns a issue given valid inputs', () => {
    const issueInfo = buildTestIssue();
    const { validateIssue } = issueValidation;

    const issue = buildIssue(issueInfo);
    expect(validateIssue).toHaveBeenCalledTimes(1);
    expect(validateIssue).toHaveBeenCalledWith(issueInfo);

    expect(issue).toEqual(issueInfo);
  });
});
