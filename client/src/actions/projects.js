import { getError, clearError } from "./error";
import axios from "axios";

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SEARCH_PROJECTS = 'SEARCH_PROJECTS';


const fetchProjects = (projects) => ({
  type: FETCH_PROJECTS,
  payload: projects
});

const searchProjects = (projects) => ({
  type: SEARCH_PROJECTS,
  payload: projects
});

export const handleFetchProjects = (token) => async (dispatch) => {
  try {
    const response = await axios.get('/api/projects', {
      headers: {
        'Authorization': token
      }
    });
    dispatch(fetchProjects(response.data.projects));
    dispatch(clearError());
  } catch (error) {
    console.log(error);
    dispatch(getError(error.response.data));
  }
}

export const handleSearchProjects = (search, token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "/api/projects",
      {
        params: {
          search,
        },
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(searchProjects(response.data.projects));
    dispatch(clearError());
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}