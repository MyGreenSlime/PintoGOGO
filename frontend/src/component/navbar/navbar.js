// import React, { Component } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from "reactstrap";
// import "../navbar/style-navbar.css";
// import propTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authActions';
// class Navigationbar extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   onLogoutClick(e) {
//     e.preventDefault();
//     this.props.logoutUser();
//     }

//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   render() {
//     const { isAuthenticated, user} = this.props.auth;
//     const forAdmin = (
//       <React.Fragment>
//       <NavItem className="navbar__item">
//          <NavLink href="/add/snack" className="navbar__link">
//            ADD SNACK
//          </NavLink>
//        </NavItem>
//        <NavItem className="navbar__item">
//          <NavLink href="/add/menu" className="navbar__link">
//            ADD FOOD
//          </NavLink>
//        </NavItem>
//       </React.Fragment>
//     )
//     const authLinkes = (
//         <React.Fragment>
//              <NavItem className="navbar__item">
//                 <NavLink href="/profile" className="navbar__link">
//                     {user.user_name}
//                 </NavLink>
//               </NavItem>
//               <NavItem className="navbar__item">
//                 <NavLink href="#" onClick= {this.onLogoutClick.bind(this)} className="navbar__link">
//                     LOG OUT
//                 </NavLink>
//               </NavItem>
//               <NavItem className="navbar__item">
//                 <NavLink href="/cart" className="navbar__link">
//                   <img
//                     src="../img/navbar/icon-cart2.png"
//                     className="navbar__icon"
//                   />
//                 </NavLink>
//               </NavItem>
//         </React.Fragment>
//     )

//     const guestLinkes = (
//         <React.Fragment>
//         <NavItem className="navbar__item">
//            <NavLink href="/register" className="navbar__link">
//              SIGN UP
//            </NavLink>
//          </NavItem>
//          <NavItem className="navbar__item">
//            <NavLink href="/login" className="navbar__link">
//              LOG IN
//            </NavLink>
//          </NavItem>
//         </React.Fragment>
//     )
//     return (
//       <div>
//         <Navbar light expand="md" className="navbar fixed-top">
//           <NavbarBrand href="/">PintoGogo</NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>

//             <Nav className="ml-auto">
//               {user.type ? forAdmin : ""}
//               {isAuthenticated ? authLinkes : guestLinkes}
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     );
//   }
// }
// Navigationbar.propTypes = {
//   logoutUser: propTypes.func.isRequired,
//   auth: propTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth
// })

// export default connect(mapStateToProps, { logoutUser })(Navigationbar);
import React, { Component } from "react";
import "../navbar/style-navbar.css";

export default class Navigationbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScrollHeight: 0
    };
  }

  componentDidMount() {
    window.onscroll = () => {
      this.setState({
        currentScrollHeight: window.scrollY
      });
    };
  }

  render() {
    const opacity = Math.max(this.state.currentScrollHeight / 100, 0.5);

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm fixed-top" style={{ opacity }}>
          <a href="/" className="navbar-brand">
            PintoGoGo
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <img
                    src="../img/navbar/icon-cart2.png"
                    className="nav-icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
