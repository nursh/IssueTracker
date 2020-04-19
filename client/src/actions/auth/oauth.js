import { getError } from '../error';
import { auth } from './type.js';


export const handleOAuth = (token, history) => async (dispatch) => {
  try { 
    dispatch(auth(token));
    history.push('/projects');
  } catch(error) {
    dispatch(getError(error));
  }
}
