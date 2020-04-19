import { CREATE_PROJECT, JOIN_PROJECT, SELECT_PROJECT } from "../actions/project";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return state;
    case JOIN_PROJECT:
      return state;
    case SELECT_PROJECT:
      return action.payload;
    case CLEAR_AUTH:
      return null;
    default:
      return state;
  }
}