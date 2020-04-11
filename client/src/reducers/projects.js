import { FETCH_PROJECTS } from "../actions/projects";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        ...action.payload
      };
  
    default:
      return state;
  }
}