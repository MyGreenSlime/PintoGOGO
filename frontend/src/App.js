import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./css/App.css";

import Navbar from "./component/navbar/navbar";
import Carousel from "./component/carousel/carousel";
import Choice from "./component/choice/choice";
import Recommend from "./component/recommend/recommend";

const Home = () => {
  return [<Navbar />, <Carousel />, <Recommend />, <Choice />];
};

/*-------------Add path of page---------------*/
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}
