import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/users';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, loggedIn, error } = useSelector(state => state.sessions);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 1,
    password: '',
    confirmPassword: ''
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name) return "Name should be present.";
    if (!email) return "Email should be present.";
    if (!password) return "Password should be present.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    console.log("Form data:", formData);

    dispatch(registerUser(formData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <h2>Please register</h2>
      {error && <p className="text-danger fw-bold">{error}</p>}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3 col-md-6 col-lg-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-6 col-lg-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-6 col-lg-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={handleChange}>
            <option value="0">User</option>
            <option value="1">Creator</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 col-md-6 col-lg-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-6 col-lg-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formError && <p className="text-danger fw-bold small mt-1">{formError}</p>}
        </Form.Group>

        <Form.Group className="mt-3 col-md-6 col-lg-3 d-flex justify-content-between">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Link to="/">Log In</Link>
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
