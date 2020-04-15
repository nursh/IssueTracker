import { FETCH_ISSUES } from "../actions/issues";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ISSUES:
      return action.payload;
    case CLEAR_AUTH: 
      return null;
    default:
      return state;
  }
}