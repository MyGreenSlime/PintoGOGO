import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom'

import DemoMenu from './component/demomenu'
import Addmenu from './component/demoaddmenu'
import Menu from './component/menu/menu.js'
import cardMenu from './component/cardmenu/cardmenu.js'
const Home = () => <h1>Home</h1>

{/*-------------Add path of page---------------*/}
class App extends Component {
  render() {
    return (

      <div className="App container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/demomenu" component={DemoMenu} />
          <Route path="/demoaddmenu" component={Addmenu} />
          <Route path="/cardmenu" component={cardMenu} />
        </Switch>
      </div>
    );
  }
}

export default App;
