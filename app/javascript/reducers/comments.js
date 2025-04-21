import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
} from '../actionTypes/comments';

const initialState = {
  loading: false,
  comments: [],
  error: null,
};

export const commentsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_COMMENTS_REQUEST:
    case POST_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: payload };
    case POST_COMMENT_SUCCESS:
      const newComments = [...state.comments, payload];
      return { ...state, loading: false, comments: newComments };
    case DELETE_COMMENT_SUCCESS:
      console.log("payload", payload, state.comments);
      const filteredComments = state.comments.filter(comment => (comment.id != payload)).filter(comment => (comment.parent_id != payload));
      console.log("filteredComments", filteredComments);
      return { ...state, loading: false, comments: filteredComments };
    case FETCH_COMMENTS_FAILURE:
    case POST_COMMENT_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
