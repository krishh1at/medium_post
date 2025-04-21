import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
  SESSION_LOGOUT_REQUEST,
  SESSION_LOGOUT_SUCCESS,
  SESSION_LOGOUT_FAILURE,
} from '../actionTypes/sessions';

const initialState = {
  loggedIn: false,
  loading: false,
  user: null,
  error: null,
};

export const sessionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SESSION_REQUEST:
    case SESSION_LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };

    case SESSION_SUCCESS:
      return { ...state, loading: false, loggedIn: true, user: payload };

    case SESSION_FAILURE:
    case SESSION_LOGOUT_FAILURE:
      return { ...state, loading: false, error: payload };

    case SESSION_LOGOUT_SUCCESS:
      return { ...state, loading: false, loggedIn: false, user: null };

    default:
      return state;
  }
};

