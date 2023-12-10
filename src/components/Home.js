import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [userInformationAvailable, setUserInformationAvailable] = useState(true);

  // client/src/components/Home.js
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if user information is available by making a request to the server
        const response = await axios.get('http://localhost:5000/api/getuser');
        const isAuthenticated = response.data.isAuthenticated;

        if (!isAuthenticated) {
          // User information is not available
          setUserInformationAvailable(false);
          return;
        }

        // User information is available, fetch products
        const productsResponse = await axios.get('http://localhost:5000/api/getproducts');
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products or checking user information:', error.message);
      }
    };

    fetchProducts();
  }, []);
 
  if (!userInformationAvailable) {
    // You can render a placeholder or redirect to a login page
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-4">Error: User information not available</h1>
        <p className="mb-4">Please log in to access this page.</p>
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src={process.env.PUBLIC_URL + '/assets/gifts.png'}  // Replace with the path to your logo image
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
              Gift Card Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
              </Nav>
              <Form inline className="d-flex align-items-center">
                <FormControl type="text" placeholder="Search" className="mr-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        <Container className="mt-3">
          <Row>
            {products.map((product) => (
              <Col key={product.id} lg={3} md={6} sm={12} className="mb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    className="img-fluid"
                    style={{ height: '200px', objectFit: 'fill' }}
                    src={
                      product.image_path
                        ? `http://localhost:5000/${product.image_path.replace(/\\/g, '/')}`
                        : '' // Or provide a default image path if desired
                    }
                    alt={product.title}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }

  
};

export default Home;
