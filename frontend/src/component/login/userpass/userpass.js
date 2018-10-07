import React, { Component } from "react";
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';

import {
  Col,
  Button,
  FormGroup,
  Input,
  FormText
} from "reactstrap";

class Userpass extends Component {
  state = {};

    componentDidMount() {
        window.addEventListener("resize", this.onResize, false);
    }

    onResize(e) {
        console.log(`${e.target.innerWidth} ${e.target.innerHeight}`);
    }

  render() {
    return (
      <div className="form-group">
          <div className="login__text">LOGIN</div>
          <AvForm>
            <Col>
              <AvGroup>
                <AvInput id="username" name="username" type="text" placeholder="username" className="login__text--box" required/>
                <AvFeedback> username is required! </AvFeedback>
              </AvGroup>
            </Col>
            <Col>
              <AvGroup>
                <AvInput id="password" name="password" type="password" placeholder="password" className="login__text--box" required/>
                <AvFeedback> password is required! </AvFeedback>
              </AvGroup>
            </Col>
            <Button href="./" className="submit__login--button">
              LOGIN
            </Button>
          </AvForm>
      </div>
    );
  }
}

export default Userpass;