import React from "react";
import { Navbar as NavbarBs, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

AiOutlineShoppingCart;

import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <AiOutlineShoppingCart />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center "
            style={{
              color: "white",
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "1rem",
              height: "1rem",
            }}
          >
            3
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
