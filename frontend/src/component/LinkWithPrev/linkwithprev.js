import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LinkWithPrev extends Component {
  render() {
    console.log("props", this.props);
    return (
      <Link
        to={{
          pathname: this.props.to,
          state: { prevLocation: window.location.href }
        }}
      >
        {this.props.children}
      </Link>
    );
  }
}
