import api from '../api/axios';
import { formatData, formatObj } from '../api/format';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
} from '../actionTypes/categories';

export const fetchCategories = (category_ids = []) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    console.log("category_ids", category_ids);

    try {
      const response = await api.get(`/api/v1/admin/categories`, { params: { ids: category_ids } });
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: formatData(response.data.data) });
    } catch {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: response });
    }
  }
}

export const postCategory = (category) => {
  const categoryPayload = { category };

  return async (dispatch) => {
    dispatch({ type: POST_CATEGORY_REQUEST });

    try {
      const response = await api.post('/api/v1/admin/categories', categoryPayload);
      dispatch({ type: POST_CATEGORY_SUCCESS, payload: formatObj(response.data.data) });
    } catch {
      dispatch({ type: POST_CATEGORY_FAILURE, payload: response });
    }
  }
}
