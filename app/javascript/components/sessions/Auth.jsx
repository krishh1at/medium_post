import React from 'react';
import { useSelector } from 'react-redux';
import LogIn from './LogIn';

const Auth = ({ children }) => {
  const { loggedIn } = useSelector(state => state.sessions);

  return (
    <>
      {loggedIn ? children : <LogIn />}
    </>
  );
};

export default Auth;
