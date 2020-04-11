import { AUTH, CLEAR_AUTH } from "../actions/auth/type";
import { decodeToken } from "../utils";

export default (state = null, action) => {
  switch(action.type) {
    case AUTH: 
      return {
        token: action.payload || null,
        name: decodeToken(action.payload)
      };
    case CLEAR_AUTH:
      return null;
    default: return state;
  }
}