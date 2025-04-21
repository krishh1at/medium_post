import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/sessions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.sessions);
  const formError = error || loginError;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if(!email || !password) {
      setLoginError('Please enter valid email or password.')
    } else {
      dispatch(loginUser({ email, password }));
    }
  }

  return(
    <div className='mx-auto'>
      <h2>Please log in</h2>
      { formError && <p className='text-danger text-bold'>{formError}</p> }

      <Form onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3 col-md-6 col-lg-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter your email address'
            value={email}
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className='mb-3 col-md-6 col-lg-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            required={true}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mt-3 col-md-6 col-lg-3 d-flex justify-content-between' controlId='formBasicPassword'>
          <Button variant='primary' type='submit' disabled={loading}>
            { loading ? 'Log In...' : 'Log In' }
          </Button>

          <Link to={'/register'}>Register</Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LogIn;
