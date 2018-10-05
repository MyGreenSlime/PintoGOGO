import React, { Component } from 'react';
import './css/App.css';
import { Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'

import Menu from './component/menu'
import Login from './component/login/login'
const Home = () => <h1>Home</h1>

{/*-------------Add path of page---------------*/}
class App extends Component {
  render() {
    return (

      <div className="App container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={Menu} />
          <center>
            <Route path="/login" component={Login} />
          </center>
        </Switch>
      </div>
    );
  }
}

export default App;
