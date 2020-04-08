import axios from 'axios';
import { getError } from '../error';
import { auth } from './type.js';


export const handleGoogleAuth = () => async (dispatch) => {
  try { 
    const response = await axios.get("/auth/google", {
      withCredentials: true,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    dispatch(auth(response.data));
  } catch(error) {
    dispatch(getError(error));
  }
}
