import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button } from "reactstrap";

export default class Choice extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button>Menu</Button>
            <p>This is a menu.</p>
          </Col>
          <Col>
            <Button>Package</Button>
            <p>This is a package.</p>
          </Col>
          <Col>
            <Button>Snack</Button>
            <p>This is a snack</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
