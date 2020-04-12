import axios from 'axios';
import { getError, clearError } from './error';
import { handleFetchProjects } from './projects';


export const CREATE_PROJECT = 'CREATE_PROJECT';
export const JOIN_PROJECT = 'JOIN_PROJECT';

const createProject = () => ({
  type: CREATE_PROJECT
});

const joinProject = () => ({
  type: JOIN_PROJECT
});

export const handleCreateProject = (token, project, history) => async (dispatch) => {
  try {
    const data = Object.assign({}, project, { team: [] });
    await axios.post('/api/projects', { project: data }, {
      headers: {
        'Authorization': token
      }
    });
    dispatch(createProject());
    dispatch(handleFetchProjects(token));
    dispatch(clearError());
    history.push('/projects');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}

export const handleJoinProject = (token, projectId) => async (dispatch) => {
  try {
    await axios.put('/api/projects', { projectId }, {
      headers: {
        'Authorization': token
      }
    });
    dispatch(joinProject());
    dispatch(clearError());
    alert(`You've been added to the project.`);
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}