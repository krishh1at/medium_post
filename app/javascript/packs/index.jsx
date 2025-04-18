import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from './App';
import Login from '../components/sessions/Login';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
