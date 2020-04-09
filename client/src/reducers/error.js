import { GET_ERROR, CLEAR_ERROR } from "../actions/error";

export default (state = null, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload; 
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
}