import axios from 'axios';
import { getError, clearError } from './error';
import { handleFetchProjects } from './projects';


export const CREATE_PROJECT = 'CREATE_PROJECT';

const createProject = () => ({
  type: CREATE_PROJECT
})

export const handleCreateProject = (token, project, history) => async (dispatch) => {
  try {
    const data = Object.assign({}, project, { team: [] });
    await axios.post('/api/projects', { project: data }, {
      headers: {
        'Authorization': token
      }
    });
    dispatch(createProject());
    dispatch(clearError());
    dispatch(handleFetchProjects(token));
    history.push('/projects');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}