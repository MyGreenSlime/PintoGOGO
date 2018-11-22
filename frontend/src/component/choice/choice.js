import React, { Component } from "react";
import Menu from "../menu/menu";
import Snack from "../snack/snack";
import Package from "../package-home/package-home";
import "../choice/style-choice.css";

export default class Choice extends Component {
  constructor(props) {
    super(props);

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
    let color = "btn button";
    color += isButton ? " btn--active" : "";
    return color;
  }

  renderChoice() {
    if (this.state.isMenu) {
      return (
        <div>
          <Menu />
        </div>
      );
    } else if (this.state.isPackage) {
      return (
        <div>
          <Package />
        </div>
      );
    } else if (this.state.isSnack) {
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
        <div className="choice-box">
          <div className="row">
            <div className="col-md-4 col-6">
              <img className="img-choice" src="../img/choice/choice_1.png" />
              <button
                className={this.setActiveButton(this.state.isMenu)}
                onClick={this.changeRenderToMenu}
              >
                MENU
              </button>
            </div>
            <div className="col-md-4 col-6">
              <img className="img-choice" src="../img/choice/choice_2.png" />
              <button
                className={this.setActiveButton(this.state.isPackage)}
                onClick={this.changeRenderToPackage}
              >
                PACKAGE
              </button>
            </div>
            <div className="col-md-4 col-6 center">
              <img className="img-choice" src="../img/choice/choice_3.png" />
              <button
                className={this.setActiveButton(this.state.isSnack)}
                onClick={this.changeRenderToSnack}
              >
                SNACK
              </button>
            </div>
          </div>
        </div>
        {this.renderChoice()}
      </React.Fragment>
    );
  }
}
