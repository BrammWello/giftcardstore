import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Button, Card, Row, Col } from 'react-bootstrap';

const HomeAdmin = () => {
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
          <Col md={6} lg={3}>
            <Card as={Link} to="/create" className="mb-3" style={{ cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <Card.Title>Create Item</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card as={Link} to="/view" className="mb-3" style={{ cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <Card.Title>View Item</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card as={Link} to="/edit" className="mb-3" style={{ cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <Card.Title>Edit Item</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card as={Link} to="/delete" className="mb-3" style={{ cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <Card.Title>Delete Item</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAdmin;
