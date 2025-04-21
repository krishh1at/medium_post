import api from '../api/axios';
import { formatData, formatDate, formatObj } from '../api/format';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  UPDATE_POST_STATUS_REQUEST,
  UPDATE_POST_STATUS_SUCCESS,
  UPDATE_POST_STATUS_FAILURE,
  DELETE_POST_SUCCESS,
} from '../actionTypes/posts'

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });

    try {
      const response = await api.get('/api/v1/posts');
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: formatData(response.data.data) });
    } catch {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: response.data });
    }
  }
}

export const fetchPost = (id) => async (dispatch) => {
  dispatch({ type: FETCH_POST_REQUEST });

  try {
    const response = await api.get(`/api/v1/posts/${id}`);

    const post = formatObj(response.data.data)
    dispatch({ type: FETCH_POST_SUCCESS, payload: post });
    console.log("post data", post);
  } catch {
    dispatch({ type: FETCH_POST_FAILURE, payload: response.data });
  }
}

export const fetchAdminPosts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });

    try {
      const response = await api.get('/api/v1/admin/posts');
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: formatData(response.data.data) });
    } catch {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: response.data });
    }
  }
}

export const createPost = (formData) => async (dispatch) => {
  dispatch({ type: FETCH_POST_REQUEST });
  console.log("post data", formData);
  try {
    const response = await api.post('/api/v1/admin/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    });

    const post = formatObj(response.data.data)
    dispatch({ type: FETCH_POST_SUCCESS, payload: post });
  } catch {
    dispatch({ type: FETCH_POST_FAILURE, payload: response.data });
  }
}

export const updatePost = (id, formData) => async (dispatch) => {
  dispatch({ type: FETCH_POST_REQUEST });

  try {
    const response = await api.put(`/api/v1/admin/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    });

    const post = formatObj(response.data.data)
    dispatch({ type: FETCH_POST_SUCCESS, payload: post });
  } catch {
    dispatch({ type: FETCH_POST_FAILURE, payload: response.data });
  }
}

export const updateAdminPostStatus = (postId, status) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_POST_STATUS_REQUEST });

    try {
      const response = await api.patch(`/api/v1/admin/posts/${postId}/update_status`, { post: { status } });
      dispatch({ type: UPDATE_POST_STATUS_SUCCESS, payload: formatObj(response.data.data) });
    } catch {
      dispatch({ type: UPDATE_POST_STATUS_FAILURE, payload: response.data });
    }
  }
}

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });

  try {
    await api.delete(`/api/v1/admin/posts/${id}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: id });
  } catch {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: response.data });
  }
}
