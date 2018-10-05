import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom'

import DemoMenu from './component/demomenu'
import Addmenu from './component/demoaddmenu'
import Register from './component/register/register.js'
import Footer from './component/footer/footer.js'

const Home = () => <h1>Home</h1>

{/*-------------Add path of page---------------*/}
class App extends Component {
  render() {
    return (

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/demomenu" component={DemoMenu} />
          <Route path="/demoaddmenu" component={Addmenu} />
          <Route path="/register" component={Register}/>
          <Route path="/footer" component={Footer} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
