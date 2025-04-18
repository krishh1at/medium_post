import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actionTypes/sessions';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const sessionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
