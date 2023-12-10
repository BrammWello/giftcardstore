import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the server
      const response = await axios.post('http://localhost:5000/api/loginadmin', formData);

      // Assuming the server responds with a token or user information upon successful login
      const token = response.data.token;

      // Store the token in localStorage or a state management solution (e.g., Redux)
      // localStorage.setItem('token', token);

      // Redirect to the admin home page
      navigate('/AdminHome');
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle login error (display error message, etc.)
    }
  };

  const handleSignUpInstead = () => {
    // Redirect to SignUp.js
    navigate('/signupadmin');
  };

  const handleCustomerInstead = () => {
    // Redirect to SignUp.js
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
      <Card className="w-lg-50 w-80">
        <Card.Body>
          <h2 className="mb-4">Admin Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>

            <Button variant="success" onClick={handleCustomerInstead}>
              User Log In Instead
            </Button>

            <Button variant="secondary" onClick={handleSignUpInstead}>
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminLogin;
