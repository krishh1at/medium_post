import api from '../api/axios';
import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
} from '../actionTypes/sessions';
import { formatObj } from '../api/format';

export const registerUser = (user) => {
  const userPayload = { user };

  return async (dispatch) => {
    dispatch({ type: SESSION_REQUEST });

    try {
      const response = await api.post('/api/v1/users', userPayload);
      const { user, token } = response.data;
      const data = formatObj(user.data);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data));

      dispatch({ type: SESSION_SUCCESS, payload: data });
    } catch(error) {
      dispatch({ type: SESSION_FAILURE, payload: 'Registration failed...' })
    }
  }
}

