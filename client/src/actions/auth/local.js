import axios from "axios";
import { getError, clearError } from "../error";
import { auth, clearAuth } from './type';


export const handleLocalSignin = ({ email, password, history, from }) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signin", {
      email,
      password
    });
    dispatch(auth(response.data));
    dispatch(clearError());
    history.push("/projects");
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const handleLocalSignup = ({ name, email, password, history }) => async (dispatch) => {
  try {
    const response = await axios.post('/auth/signup', {
      name,
      email,
      password
    });
    dispatch(auth(response.data));
    dispatch(clearError());
    history.push('/projects');
  } catch (error) {
    dispatch(getError(error.response.data));
  }
}

export const handleLogout = () => (dispatch) => {
  dispatch(clearAuth());
}
