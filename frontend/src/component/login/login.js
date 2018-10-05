import React, { Component } from "react";
import "../../css/login.css";
import Navbar from "./navbar.js";
import Userpass from "../login/userpass";
import Googlelogin from "../login/googlelogin";
import Facebooklogin from "../login/facebooklogin";

class Login extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="login__box__container">
          <div className="login__box">
            <Userpass />
            <Googlelogin />
            <Facebooklogin />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
