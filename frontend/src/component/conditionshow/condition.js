import React, { Component } from "react";
import Menu from "../menu/menu.js";
import Snack from "../snack/snack.js";

class ConditionShowMenuPackSnack extends Component {
  state = {
    isMenu: true,
    isPackage: false,
    isSnack: false
  };

  constructor(props) {
    super(props);
    this.changeRenderToMenu = this.changeRenderToMenu.bind(this);
    this.changeRenderToPackage = this.changeRenderToPackage.bind(this);
    this.changeRenderToSnack = this.changeRenderToSnack.bind(this);
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

  render() {
    if (this.state.isMenu) {
      return (
        <div>
          <Menu />
        </div>
      );
    } else if (this.state.isPackage) {
      return (
        <div>
          <Snack />
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
}

export default ConditionShowMenuPackSnack;
