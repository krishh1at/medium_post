import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '../reducers/sessions';
import { postsReducer } from '../reducers/posts';
import { postReducer } from '../reducers/post';
import { commentsReducer } from '../reducers/comments';
import { categoriesReducer } from '../reducers/categories';

const store = configureStore({
  reducer: {
    sessions: sessionReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
    categories: categoriesReducer,
  },
});

export default store;
