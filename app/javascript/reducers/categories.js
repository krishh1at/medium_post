import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
} from '../actionTypes/categories';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CATEGORIES_REQUEST:
    case POST_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: payload };
    case POST_CATEGORY_SUCCESS:
      const newCategories = [...state.categories, payload];
      return { ...state, loading: false, categories: newCategories };
    case FETCH_CATEGORIES_FAILURE:
    case POST_CATEGORY_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
