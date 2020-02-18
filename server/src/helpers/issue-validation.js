import { requiredParam } from './required-param';

export const validateIssue = ({
  title = requiredParam('title'),
  project = requiredParam('project'),
  progress = requiredParam('progress'),
  status = requiredParam('status'),
  priority = requiredParam('priority'),
  createdOn = new Date(),
  createdBy = requiredParam('createdBy'),
  ...otherFields
}) => {
  validateProgress(progress);
  validateStatus(status);
  validatePriority(priority);

  return {
    title,
    project,
    progress,
    status,
    priority,
    createdOn,
    createdBy,
    ...otherFields
  };
};

export function validateProgress(progress) {
  const validStates = ['backlog', 'in progress', 'done'];
  if (!validStates.includes(progress)) {
    throw new Error('Progress value is not valid.');
  }
}

export function validateStatus(status) {
  const validStates = ['OPEN', 'CLOSED'];
  if (!validStates.includes(status)) {
    throw new Error('Status value is not valid.');
  }
}

export function validatePriority(priority) {
  const validStates = ['HIGH', 'MEDIUM', 'LOW'];
  if (!validStates.includes(priority)) {
    throw new Error('Priority value is not valid.');
  }
}
