import React, { Component } from "react";
import "./css/App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./component/navbar/navbar";
import Carousel from "./component/carousel/carousel";
import Choice from "./component/choice/choice";

const Home = () => <h1>Home</h1>;

/*-------------Add path of page---------------*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Carousel />
        <Choice />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
