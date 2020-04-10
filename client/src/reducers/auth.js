import { AUTH, CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch(action.type) {
    case AUTH: 
      return action.payload || null;
    case CLEAR_AUTH:
      return null;
    default: return state;
  }
}