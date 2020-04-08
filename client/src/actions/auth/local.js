import axios from "axios";
import { getError, clearError } from "../error";
import { auth } from './type';


export const handleLocalAuth = ({ email, password, history }) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signin", {
      email,
      password
    });
    dispatch(auth(response.data));
    dispatch(clearError());
    history.push('/projects')
  } catch (error) {
    dispatch(getError(error));
  }
};
