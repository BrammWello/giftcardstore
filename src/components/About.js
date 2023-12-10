import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
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
      <Container className="mt-4">
        <Row>
          <Col>
            <h2 className="mb-4">About Us</h2>
            <Card>
              <Card.Body>
                <p>
                  Welcome to our Gift Card Store! We are passionate about providing you with a wide
                  selection of gift cards for various occasions. Whether you're celebrating a
                  birthday, anniversary, or any special moment, we've got the perfect gift card for you.
                </p>
                <p>
                  Our goal is to make gift-giving easy and enjoyable. Browse through our collection,
                  find the perfect gift card, and make your loved ones' day extra special.
                </p>
                <p>
                  Thank you for choosing our Gift Card Store. If you have any questions or need
                  assistance, feel free to reach out to our customer support team.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
