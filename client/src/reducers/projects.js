import { FETCH_PROJECTS, SEARCH_PROJECTS } from "../actions/projects";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;
    case SEARCH_PROJECTS: 
      return action.payload;
    case CLEAR_AUTH:
      return null;
    default:
      return state;
  }
}