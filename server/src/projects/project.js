import { requiredParam } from 'helpers/required-param';
import { validateProject } from 'helpers/project-validation';

export default function buildProject(
  projectInfo = requiredParam('projectInfo')
) {
  const project = validateProject(projectInfo);
  return project;
}
