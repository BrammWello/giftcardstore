import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Correct import

const SignUp = () => {
  const navigate = useNavigate();  // Correct hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup data to the server
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      // Handle success or redirect
      console.log(response.data);
      // Redirect to the login page after successful signup
      navigate('/login');  // Correct usage of navigate
    } catch (error) {
      // Handle error
      console.error('Signup error:', error.message);
    }
  };

  return (
    <Card className="p-4 w-80 w-lg-50 mx-auto">
      <h2 className="mb-4">Customer Sign Up</h2>
      <Form onSubmit={handleSubmit} className="w-100">
      <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="tel" name="phone" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control as="textarea" name="address" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>

        <Button variant="success" onClick={() => navigate('/login')}>  {/* Correct usage of navigate */}
          Log In Instead
        </Button>

        <Button variant="info" onClick={() => navigate('/signupadmin')}>  {/* Correct usage of navigate */}
          Go to Create Admin Account
        </Button>
      </Form>
    </Card>
  );
};

export default SignUp;
