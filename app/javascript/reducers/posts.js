import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE
} from '../actionTypes/posts'

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

export const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POST_SUCCESS:
      return { ...state, loading: false, posts: payload };
    case FETCH_POST_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
