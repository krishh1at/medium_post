import api from '../api/axios';

import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE
} from '../actionTypes/posts'

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POST_REQUEST });

    try {
      const response = await api.get('/posts');
      dispatch({ type: FETCH_POST_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: FETCH_POST_FAILURE, payload: response.data });
    }
  }
}
