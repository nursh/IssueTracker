import { SEARCH_PROJECTS, FETCH_PROJECTS } from "../actions/projects";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case SEARCH_PROJECTS:
      return action.payload ? true : false;
    case FETCH_PROJECTS:
      return null;
    case CLEAR_AUTH:
      return null;
    default:
      return state;
  }
};
