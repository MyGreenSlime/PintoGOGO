import React, { Component } from "react";
import Userpass from "../userpass/userpass";
import "../mainlogin/style-login.css";
import "../userpass/style-userpass.css";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="login__box__container">
          <div className="login__box">
            <img className="logo" src="img/login/icon.png" />
            <div className="login__input">
            <Userpass />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
