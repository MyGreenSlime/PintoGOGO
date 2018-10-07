import React, { Component } from "react";
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
          <Col>
            <FormGroup>
              <Input type="text" placeholder="username" className="login__text--box" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input type="password" placeholder="password" className="login__text--box" />
            </FormGroup>
          </Col>
          <Button href="./" className="submit__login--button">
            LOGIN
          </Button>
      </div>
    );
  }
}

export default Userpass;