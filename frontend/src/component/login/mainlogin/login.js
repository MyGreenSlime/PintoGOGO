import React, { Component } from "react";
import Userpass from "../userpass/userpass";
import '../mainlogin/style-login.css'
import '../userpass/style-userpass.css'

class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="login__box__container">
          <div className="login__box">
            <Userpass />  
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
