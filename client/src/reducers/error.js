import { GET_ERROR, CLEAR_ERROR } from "../actions/error";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload; 
    case CLEAR_ERROR:
      return null;
    case CLEAR_AUTH: 
      return null;
    default:
      return state;
  }
}