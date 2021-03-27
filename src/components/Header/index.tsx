import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom'

const Tasks: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Navbar.Brand href="#home">M.YAMAN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
          <Nav.Item as={Link} className="nav-link" to="/tasks">Tasks</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Tasks;
