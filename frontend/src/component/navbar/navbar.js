import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
} from "reactstrap";
import "../navbar/style-navbar.css";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getCurrentOrder } from "../api/api";
import { currentOrder } from "../../actions/authActions";
class Navigationbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      currentUser: [],
      order: [],
      amountorder: this.props.order.order.amount
    };
    this.countOrder = this.countOrder.bind(this);
  }
  componentDidMount() {
    this.props.currentOrder();
    this.setState({
      amountorder: this.props.order.order.amount
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      amountorder: nextProps.order.order.amount
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/";
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  countOrder() {
    console.log(this.props.order.order.amount);
    if (this.state.amountorder !== 0) {
      return <div className="circle__counter">{this.state.amountorder}</div>;
    }
    return;
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // {console.log("nav",user)}
    const showorder = (
      <div className="circle__counter">{this.state.amountorder}</div>
    );
    const forAdmin = (
      <React.Fragment>
        <NavItem className="navbar__item">
          <NavLink href="/add/snack" className="navbar__link">
            ADD SNACK
          </NavLink>
        </NavItem>
        <NavItem className="navbar__item">
          <NavLink href="/add/menu" className="navbar__link">
            ADD FOOD
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
    const authLinkes = (
      <React.Fragment>
        <NavItem className="navbar__item" onClick={this.userChoice} />

        <UncontrolledDropdown nav inNavbar>
          <NavItem className="navbar__item">
            <DropdownToggle className="navbar__link" nav caret>
              {user.user_name}
            </DropdownToggle>
            <DropdownMenu>
              <NavLink href="/profile" className="navbar__link">
                <DropdownItem>Profile</DropdownItem>
              </NavLink>
              <NavLink href="/mypackage" className="navbar__link">
                <DropdownItem>My Package</DropdownItem>
              </NavLink>
            </DropdownMenu>
          </NavItem>
        </UncontrolledDropdown>
        <NavItem className="navbar__item">
          <NavLink
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="navbar__link"
          >
            LOG OUT
          </NavLink>
        </NavItem>
        <NavItem className="navbar__item">
          <NavLink href="/cart" className="navbar__link">
            {this.state.amountorder >= 1 ? showorder : ""}
            <img src="/img/navbar/icon-cart2.png" className="navbar__icon" />
            {/* <div className="circle__counter">52</div> */}
          </NavLink>
        </NavItem>
      </React.Fragment>
    );

    const guestLinkes = (
      <React.Fragment>
        <NavItem className="navbar__item">
          <NavLink href="/register" className="navbar__link">
            SIGN UP
          </NavLink>
        </NavItem>
        <NavItem className="navbar__item">
          <NavLink href="/login" className="navbar__link">
            LOG IN
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
    return (
      <div>
        <Navbar light expand="lg" className="navbar fixed-top">
          <NavbarBrand href="/">PintoGogo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">
              <NavItem className="navbar__item">
                <NavLink href="/show/menu" className="navbar__link">
                  MENU
                </NavLink>
              </NavItem>
              <NavItem className="navbar__item">
                <NavLink href="/show/snack" className="navbar__link">
                  SNACK
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <NavItem className="navbar__item">
                  <DropdownToggle className="navbar__link" nav caret>
                    PACKAGE
                  </DropdownToggle>
                  <DropdownMenu>
                    <NavLink href="/package" className="navbar__link">
                      <DropdownItem>Choose package</DropdownItem>
                    </NavLink>
                    <NavLink href="/package/manage" className="navbar__link">
                      <DropdownItem>Create package</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </NavItem>
              </UncontrolledDropdown>
              {user.type ? forAdmin : ""}
              {isAuthenticated ? authLinkes : guestLinkes}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
Navigationbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  order: propTypes.object.isRequired,
  currentOrder: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(
  mapStateToProps,
  { logoutUser, currentOrder }
)(Navigationbar);
