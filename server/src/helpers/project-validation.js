import { requiredParam } from './required-param';

export const validateProject = ({
  title = requiredParam('title'),
  createdOn = new Date(),
  createdBy = requiredParam('createdBy'),
  ...otherFields
}) => {
  validateTitle(title);

  return {
    title,
    createdOn,
    createdBy,
    ...otherFields
  };
};

export function validateTitle(title) {
  const validTitle = title.length >= 6;

  if (!validTitle) {
    throw new Error('Title must be at least 6 characters long');
  }
}
