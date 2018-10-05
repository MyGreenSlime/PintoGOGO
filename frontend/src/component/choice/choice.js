import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardText,
  Button
} from "reactstrap";

import "../choice/style-choice.css";

export default class Choice extends Component {
  render() {
    return (
      <Container className="choice__block" fluid>
        <Row className="justify-content-center">
          <CardGroup className="cardgroup">
            <Card className="card">
              <CardImg src="../img/homepage/choice_1.png" className="card__img" />
              <CardBody>
                <Button className="button btn--active">MENU</Button>
                <CardText>This is a package</CardText>
              </CardBody>
            </Card>
            <Card className="card">
              <CardImg src="../img/homepage/choice_2.png" className="card__img" />
              <CardBody>
                <Button className="button">PACKAGE</Button>
                <CardText>This is a Package</CardText>
              </CardBody>
            </Card>
            <Card className="card">
              <CardImg src="../img/homepage/choice_3.png" className="card__img" />
              <CardBody>
                <Button className="button">SNACK</Button>
                <CardText>This is a Snack</CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Row>
      </Container>
    );
  }
}
