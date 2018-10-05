import React, { Component } from "react";
import "../../css/login.css";
import Navbar from "./navbar.js";
import Userpass from '../login/userpass';
import Googlelogin from '../login/googlelogin';
import Facebooklogin from '../login/facebooklogin'

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <div>
          <Navbar />
        </div> */}
        <div className="login__box">
          <Userpass />
          <Googlelogin />
          <Facebooklogin />
        </div>

      </React.Fragment>
    );
  }
}

export default Login;
