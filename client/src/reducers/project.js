import { CREATE_PROJECT, JOIN_PROJECT, SELECT_PROJECT } from "../actions/project";

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return state;
    case JOIN_PROJECT:
      return state;
    case SELECT_PROJECT:
      return action.payload;
    default:
      return state;
  }
}