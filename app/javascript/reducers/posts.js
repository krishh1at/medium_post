import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  UPDATE_POST_STATUS_REQUEST,
  UPDATE_POST_STATUS_SUCCESS,
  UPDATE_POST_STATUS_FAILURE,
  DELETE_POST_SUCCESS,
} from '../actionTypes/posts'

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

export const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_POSTS_REQUEST:
    case UPDATE_POST_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload };
    case UPDATE_POST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post.id === payload.id ? { ...payload } : post
        ),
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post.id != payload.id),
      };
    case FETCH_POSTS_FAILURE:
    case UPDATE_POST_STATUS_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
