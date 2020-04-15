import axios from 'axios';
import { getError, clearError } from './error';


export const DELETE_ISSUE = 'DELETE_ISSUE';
export const CREATE_ISSUE = 'CREATE_ISSUE';
export const EDIT_ISSUE = 'EDIT_ISSUE';
export const FETCH_ISSUES = 'FETCH_ISSUES'


const fetchIssues = (issues) => ({
  type: FETCH_ISSUES,
  payload: issues
});

const deleteIssue = () => ({
  type: DELETE_ISSUE
});

const createIssue = () => ({
  type: CREATE_ISSUE
});

const editIssue = () => ({
  type: EDIT_ISSUE
});

export const handleDeleteIssue = (issueId, token, history) => async (dispatch) => {
  try {
    await axios.delete('api/issues', {
      headers: {
        'Authorization': token
      }, 
      params: {
        issueId
      }
    });
    dispatch(deleteIssue());
    dispatch(clearError());
    history.push('/project');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}

export const handleCreateIssue = (token, history) => async (dispatch) => {
  try {
    const data = {};
    await axios.post('/api/issues', { issue: data }, {
      headers: {
        'Authorization': token
      }
    });
    dispatch(createIssue());
    dispatch(handleFetchIssues());
    dispatch(clearError());
    history.push('/project');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}

export const handleFetchIssues = (projectId, token) => async (dispatch) => {
  try {
    const response = await axios.get('/api/issues', {
      headers: {
        'Authorization': token
      },
      params: {
        projectId
      }
    });
    dispatch(fetchIssues(response.data.issues));
    dispatch(clearError());
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}