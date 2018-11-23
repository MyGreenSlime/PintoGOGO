import React, { Component } from "react";
import "./package";
import "./nopackage.css";
export default class NoPackage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="package-box">
          <div className="set-screen-nopack">There is no package.</div>
        </div>
      </React.Fragment>
    );
  }
}
