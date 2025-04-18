import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/sessions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.sessions);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return(
    <div>
      <h2>Login Form</h2>
      { error && <p className='text-danger'>Error: {error}</p> }

      <form onSubmit={onSubmitHandler}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />

        <button type='submit' disabled={loading}>
          { loading ? 'Logging in...' : 'Login' }
        </button>
      </form>
    </div>
  );
}

export default Login;
