import React, { Component } from "react";
import Navbar from "./navbar.js";
import "../../css/login.css";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class Userpass extends Component {
  state = {};
  render() {
    return (
      <div className="form-group">
          <div className="login__text">LOGIN</div>
          <Col>
            <FormGroup>
              <Input type="text" placeholder="username" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input type="password" placeholder="password" />
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
