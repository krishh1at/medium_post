import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  UPDATE_POST_STATUS_SUCCESS,
} from '../actionTypes/posts'

const initialState = {
  loading: false,
  attributes: null,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POST_SUCCESS:
    case UPDATE_POST_STATUS_SUCCESS:
      return { ...state, loading: false, attributes: payload };
    case FETCH_POST_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
