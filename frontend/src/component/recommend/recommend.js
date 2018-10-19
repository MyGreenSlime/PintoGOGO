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
      <section className="recommend__block" fluid>
        <Container>
          <h3 className="headtext">Recommended Menu</h3>
          <CardGroup className="cardgroup__recommend">
            <Card className="card__recommend mr-3">
              <CardImg
                src="http://images.media-allrecipes.com/userphotos/960x960/5147291.jpg"
                className="cardimg__recommend"
              />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card__recommend ml-3 mr-3">
              <CardImg
                src="https://images.media-allrecipes.com/userphotos/300x300/3749989.jpg"
                className="cardimg__recommend"
              />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card__recommend ml-3 mr-3">
              <CardImg
                src="https://images.media-allrecipes.com/userphotos/300x300/3758976.jpg"
                className="cardimg__recommend"
              />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
            <Card className="card__recommend ml-3">
              <CardImg
                src="https://images.media-allrecipes.com/userphotos/300x300/3759440.jpg"
                className="cardimg__recommend"
              />
              <CardBody>
                <CardText>spaghetti salmon steak</CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Container>
      </section>
    );
  }
}
