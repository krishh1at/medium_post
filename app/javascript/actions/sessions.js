import api from '../api/axios';
import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
  SESSION_LOGOUT_REQUEST,
  SESSION_LOGOUT_SUCCESS,
  SESSION_LOGOUT_FAILURE,
} from '../actionTypes/sessions';
import { formatObj } from '../api/format';

export const loginUser = (loginInfo) => {
  return async (dispatch) => {
    dispatch({ type: SESSION_REQUEST });

    try {
      const response = await api.post('/api/v1/sessions', loginInfo);
      const { user, token } = response.data;
      const data = formatObj(user.data);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data));

      dispatch({ type: SESSION_SUCCESS, payload: data });
    } catch(error) {
      dispatch({ type: SESSION_FAILURE, payload:'Login failed' })
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: SESSION_LOGOUT_REQUEST });

    try {

      localStorage.setItem('token', null);
      localStorage.setItem('user', null);

      dispatch({ type: SESSION_LOGOUT_SUCCESS, payload: null });
    } catch(error) {
      dispatch({ type: SESSION_LOGOUT_FAILURE, payload:'Logout failed' })
    }
  }
}

