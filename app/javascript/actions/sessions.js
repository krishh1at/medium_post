import api from '../api/axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actionTypes/sessions';

export const loginUser = (loginInfo) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = api.post('/api/v1/sessions', loginInfo);
      const { user, token } = response.data;
      localStorage.setItem('token', token);

      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch(error) {
      dispatch({ type: LOGIN_FAILURE, payload:'Login failed' })
    }
  }
}
