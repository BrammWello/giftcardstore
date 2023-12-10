import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // client/src/components/Login.js
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send login data to the server
    const response = await axios.post('http://localhost:5000/api/login', formData);

    // Assuming the server responds with a token or user information upon successful login
    const token = response.data.token;

    // Set user session on the server
    await axios.post('http://localhost:5000/api/setuser', {
      userId: response.data.userId, // Replace with the actual user ID from the server response
      email: response.data.email, // Replace with the actual username from the server response
    });

    // Fetch user information to check authentication
    const userResponse = await axios.get('http://localhost:5000/api/getuser');
    const isAuthenticated = userResponse.data.isAuthenticated;

    if (isAuthenticated) {
      // Redirect to the home page
      navigate('/');
    } else {
      // Handle the case where the user is not authenticated
      console.error('User information not available after login');
    }
  } catch (error) {
    console.error('Login error:', error.message);
    // Handle login error (display error message, etc.)
  }
  };


  const handleSignUpInstead = () => {
    // Redirect to SignUp.js
    navigate('/SignUp');
  };

  const handleAdminInstead = () => {
    // Redirect to SignUp.js
    navigate('/loginadmin');
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
      <Card className="w-lg-50 w-80">
        <Card.Body>
          <h2 className="mb-4">Customer Login</h2>
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

            <Button variant="danger" onClick={handleAdminInstead}>
              Go to Admin Login
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

export default Login;
