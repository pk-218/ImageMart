import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Navbar.Brand href="#home">ImageMart</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/list">
          Images
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
