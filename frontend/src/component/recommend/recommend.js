import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
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
      <Container className="recommend__block">
        <h3 className="headtext">Recommended Menu</h3>
        <div className="d-flex justify-content-center row-h1">
          <div className="p-4 item-h1">
            <img src="../img/choice_1.png" resizeMode="cover" className="img" />
          </div>
          <div className="p-4 item-h1">
            <img src="../img/choice_1.png" resizeMode="cover" className="img" />
          </div>
          <div className="p-4 item-h1">
            <img src="../img/choice_1.png" resizeMode="cover" className="img" />
          </div>
          <div className="p-4 item-h1">
            <img src="../img/choice_1.png" resizeMode="cover" className="img" />
          </div>
        </div>
        {/* <CardGroup>
          <Card className="card">
            <CardImg src="img/carousel_1.jpg" className="card__img" />
            <CardBody>
              <CardText>spaghetti salmon steak</CardText>
            </CardBody>
          </Card>
          <Card className="card">
            <CardImg src="img/carousel_1.jpg" className="card__img" />
            <CardBody>
              <CardText>spaghetti salmon steak</CardText>
            </CardBody>
          </Card>
          <Card className="card">
            <CardImg src="img/carousel_1.jpg" className="card__img" />
            <CardBody>
              <CardText>spaghetti salmon steak</CardText>
            </CardBody>
          </Card>
          <Card className="card">
            <CardImg src="img/carousel_1.jpg" className="card__img" />
            <CardBody>
              <CardText>spaghetti salmon steak</CardText>
            </CardBody>
          </Card>
        </CardGroup> */}
      </Container>
    );
  }
}
