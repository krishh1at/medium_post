import api from '../api/axios';
import { formatData, formatObj } from '../api/format';

import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
} from '../actionTypes/comments';

export const fetchComments = (postId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST });

    try {
      const response = await api.get(`/api/v1/posts/${postId}/comments`);
      dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: formatData(response.data.data) });
    } catch {
      dispatch({ type: FETCH_COMMENTS_FAILURE, payload: response });
    }
  }
}

export const fetchComment = (postId, id) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENT_REQUEST });

  try {
    const response = await api.get(`/api/v1/posts/${postId}/comments/${id}`);

    const comment = formatObj(response.data.data)
    dispatch({ type: FETCH_COMMENT_SUCCESS, payload: comment });
  } catch {
    dispatch({ type: FETCH_COMMENT_FAILURE, payload: response.data });
  }
}

export const postComment = (postId, comment) => async (dispatch) => {
  dispatch({ type: POST_COMMENT_REQUEST });

  try {
    const response = await api.post(`/api/v1/posts/${postId}/comments`, { comment });
    dispatch({ type: POST_COMMENT_SUCCESS, payload: formatObj(response.data.data) });
  } catch (error) {
    dispatch({ type: POST_COMMENT_FAILURE, payload: error.response.data });
  }
}

export const deleteComment = (postId, id) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENT_REQUEST });

  try {
    await api.delete(`/api/v1/posts/${postId}/comments/${id}`);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: id });
  } catch {
    dispatch({ type: FETCH_COMMENT_FAILURE, payload: response.data });
  }
}
