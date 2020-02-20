import { requiredParam } from 'helpers/required-param';
import { validateIssue } from 'helpers/issue-validation';

export default function buildIssue(issueInfo = requiredParam('issueInfo')) {
  const issue = validateIssue(issueInfo);
  return issue;
}
