import { AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch(action.type) {
    case AUTH: 
      return action.payload || null;
    default: return state;
  }
}