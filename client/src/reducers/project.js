import { CREATE_PROJECT, JOIN_PROJECT } from "../actions/project";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return state;
    case JOIN_PROJECT:
      return state;
    default:
      return state;
  }
}