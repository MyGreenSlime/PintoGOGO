import React, { Component } from "react";
import "./choicepackage.css";

export default class ChoicePackage extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="btn-group btn-choice-group"
          role="group"
          aria-label="Choice Package"
        >
          {[3, 5, 7].map((d, index) => (
            <button
              type="button"
              className="btn btn-choice-set"
              onClick={() => this.props.onSetDay(d)}
              key={index}
            >
              {d} DAYS
            </button>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
