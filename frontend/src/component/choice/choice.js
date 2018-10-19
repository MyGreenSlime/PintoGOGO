import React, { Component } from "react";
import {
  Container,
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardText,
  Button
} from "reactstrap";

import Menu from "../menu/menu";
import Snack from "../snack/snack"

import "../choice/style-choice.css";

export default class Choice extends Component {
  

  constructor() {
    super();
    this.state = {
      isMenu: true,
      isPackage: false,
      isSnack: false
    };
    this.changeRenderToMenu = this.changeRenderToMenu.bind(this);
    this.changeRenderToPackage = this.changeRenderToPackage.bind(this);
    this.changeRenderToSnack = this.changeRenderToSnack.bind(this);
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  changeRenderToMenu() {
    this.setState({
      isMenu: true,
      isPackage: false,
      isSnack: false
    });
  }

  changeRenderToPackage() {
    this.setState({
      isMenu: false,
      isPackage: true,
      isSnack: false
    });
  }

  changeRenderToSnack() {
    this.setState({
      isMenu: false,
      isPackage: false,
      isSnack: true
    });
  }

  setActiveButton(isButton) {
    let color = "button";
    color += isButton ? " btn--active" : "";
    return color;
  }

  renderChoice(){
    if (this.state.isMenu) {
      return (
        <div>
          <Menu />
        </div>
      );
    }
    else if (this.state.isPackage) {
      return( <div>
          <h1>There is no package.</h1>
      </div>);
    }
    else if (this.state.isSnack) {
      return (
        <div>
          <Snack />
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
      <section className="choice__block" fluid>
        <Container>
          <CardGroup className="cardgroup__choice">
            <Card className="card__choice">
              <CardImg src="../img/choice/choice_1.png" className="cardimg__choice" />
              <CardBody>
                <Button
                  className={this.setActiveButton(this.state.isMenu)}
                  onClick={this.changeRenderToMenu}
                >
                  MENU
                </Button>
                <CardText>This is a Menu</CardText>
              </CardBody>
            </Card>
            <Card className="card__choice">
              <CardImg src="../img/choice/choice_2.png" className="cardimg__choice" />
              <CardBody>
                <Button
                  className={this.setActiveButton(this.state.isPackage)}
                  onClick={this.changeRenderToPackage}
                >
                  PACKAGE
                </Button>
                <CardText>This is a Package</CardText>
              </CardBody>
            </Card>
            <Card className="card__choice">
              <CardImg src="../img/choice/choice_3.png" className="cardimg__choice" />
              <CardBody>
                <Button
                  className={this.setActiveButton(this.state.isSnack)}
                  onClick={this.changeRenderToSnack}
                >
                  SNACK
                </Button>
                <CardText>This is a Snack</CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Container>
      </section>
      {this.renderChoice()}
      </React.Fragment>
    );
  }
}
