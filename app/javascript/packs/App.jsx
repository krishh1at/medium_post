import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/sessions';
import { SESSION_LOGOUT_SUCCESS, SESSION_SUCCESS } from '../actionTypes/sessions';
import AppNavbar from '../components/Navbar/AppNavbar';
import AppRouter from './AppRouter';
import getCurrentUser from '../api/currentUser';

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.sessions);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const userFromStorage = getCurrentUser();

    if (userFromStorage) {
      dispatch({ type: SESSION_SUCCESS, payload: userFromStorage });
    } else {
      dispatch({ type: SESSION_LOGOUT_SUCCESS, payload: null });
    }
  }, [dispatch]);

  return (
    <>
      <AppNavbar loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
      <AppRouter />
    </>
  );
};

export default App;
