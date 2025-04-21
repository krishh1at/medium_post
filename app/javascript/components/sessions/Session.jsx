import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LogIn from './LogIn';
import PublicPosts from '../posts/PublicPosts';

const Session = () => {
  const { loggedIn } = useSelector(state => state.sessions);

  return(
    <div className="d-flex justify-content-center align-items-center min-vh-50">   
      <Container>
        <LogIn />
      </Container>
    </div>
  );
}

export default Session;
