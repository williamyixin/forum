import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "blue",
            marginRight: "15px",
            borderRadius: "20px",
          }}
        />
        <Navbar.Brand href="#home">NotReddit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Movies</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
