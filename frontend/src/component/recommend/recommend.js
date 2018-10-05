import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardText
} from "reactstrap";

import "../recommend/style-recommend.css";

export default class Recommend extends Component {
  render() {
    return (
      <Container className="recommend__block" fluid>
        <h3 className="headtext">Recommended Menu</h3>
        <Row className="justify-content-center">
          <CardGroup className="cardgroup">
            <Card className="card">
              <CardImg src="img/homepage/carousel_1.jpg" className="card__img" />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card">
              <CardImg src="img/homepage/carousel_1.jpg" className="card__img" />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card">
              <CardImg src="img/homepage/carousel_1.jpg" className="card__img" />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card">
              <CardImg src="img/homepage/carousel_1.jpg" className="card__img" />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Row>
      </Container>
    );
  }
}
