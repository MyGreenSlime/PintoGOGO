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

import Menu from "../menu/menu";
import Snack from "../snack/snack"
// import Condition from "../conditionshow/condition"

import "../choice/style-choice.css";

export default class Choice extends Component {

  state = {
    isMenu: true,
    isPackage: false,
    isSnack: false
  }

  constructor(props) {
    super(props);
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
    }
    );
  }

  changeRenderToPackage() {
    this.setState({
      isMenu: false,
      isPackage: true,
      isSnack: false
    }
    );
  }

  changeRenderToSnack() {
    this.setState({
      isMenu: false,
      isPackage: false,
      isSnack: true
    }
    );
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

  setActiveButton(isButton){
    let color ="button" 
    color += (isButton)? " btn--active": ""
    return color
  }

  render() {
    return <React.Fragment>
        <Container className="choice__block" fluid>
          <Row className="justify-content-center">
            <CardGroup className="cardgroup">
              <Card className="card">
                <CardImg src="../img/homepage/choice_1.png" className="card__img" />
                <CardBody>
                <Button className={this.setActiveButton(this.state.isMenu)} onClick={this.changeRenderToMenu}>
                    MENU
                  </Button>
                  <CardText>This is a menu</CardText>
                </CardBody>
              </Card>
              <Card className="card">
                <CardImg src="../img/homepage/choice_2.png" className="card__img" />
                <CardBody>
                <Button className={this.setActiveButton(this.state.isPackage)} onClick={this.changeRenderToPackage}>PACKAGE</Button>
                  <CardText>This is a Package</CardText>
                </CardBody>
              </Card>
              <Card className="card">
                <CardImg src="../img/homepage/choice_3.png" className="card__img" />
                <CardBody>
                  <Button className={this.setActiveButton(this.state.isSnack)} onClick={this.changeRenderToSnack}>SNACK</Button>
                  <CardText>This is a Snack</CardText>
                </CardBody>
              </Card>
            </CardGroup>
          </Row>
        </Container>
        {this.renderChoice()}
        {/* <Condition/> */}
      </React.Fragment>;
  }
}
