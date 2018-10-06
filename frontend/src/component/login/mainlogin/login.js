import React, { Component } from "react";
import Userpass from "../userpass/userpass";
import Googlelogin from "../google/googlelogin";
import Facebooklogin from "../facebook/facebooklogin";
import '../mainlogin/style-login.css'
import "../google/style-google.css";
import '../facebook/style-facebook.css'
import '../userpass/style-userpass.css'

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
