import axios from 'axios';
import { getError, clearError } from './error';
import { handleFetchProjects } from './projects';
import { handleFetchIssues } from './issues';


export const CREATE_PROJECT = 'CREATE_PROJECT';
export const JOIN_PROJECT = 'JOIN_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const SELECT_PROJECT = 'SELECT_PROJECT';

const createProject = () => ({
  type: CREATE_PROJECT
});

const joinProject = () => ({
  type: JOIN_PROJECT
});

const deleteProject = () => ({
  type: DELETE_PROJECT
});

const selectProject = (project) => ({
  type: SELECT_PROJECT,
  payload: project
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

export const handleDeleteProject = (project, token, history) => async (dispatch) => {
  try {
    const { _id: projectId, createdBy: { id: createdById } } = project;
    await axios.delete('/api/projects', {
      headers: {
        'Authorization': token
      },
      params: {
        createdById, 
        projectId
      }
    });
    dispatch(deleteProject());
    dispatch(clearError());
    history.push('/projects');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}

export const handleSelectProject = (project, token) => (dispatch) => {
  dispatch(selectProject(project));
  dispatch(handleFetchIssues(project._id, token));
}