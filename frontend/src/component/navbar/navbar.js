import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../navbar/style-navbar.css";

export default class Navigationbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className="navbar fixed-top">
          <NavbarBrand href="/">PintoGogo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">
              <NavItem className="navbar__item">
                <NavLink href="/" className="navbar__link">
                  Sign up
                </NavLink>
              </NavItem>
              <NavItem className="navbar__item">
                <NavLink href="/" className="navbar__link">
                  Log in
                </NavLink>
              </NavItem>
              <NavItem className="navbar__item">
                <NavLink href="/" className="navbar__link">
                  Cart
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
