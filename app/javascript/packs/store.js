import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { sessionReducer } from '../reducers/sessions';
import { postsReducer } from '../reducers/posts';

const rootReducer = combineReducers({
  sessions: sessionReducer,
  posts: postsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
