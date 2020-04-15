import { FETCH_ISSUES, CREATE_ISSUE, EDIT_ISSUE } from "../actions/issues";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ISSUES:
      return action.payload;
    case CREATE_ISSUE:
      return state;
    case EDIT_ISSUE:
      return state;
    case CLEAR_AUTH:
      return null;
    default:
      return state;
  }
}