import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom'
//---------------don--------------------------------
import Addmenu from './component/demoaddmenu'
import Addsnack from './component/demoaddsnack';
import Snack from './component/snack/snack.js'
//---------------name-------------------------------
import Navbar from "./component/navbar/navbar";
import Carousel from "./component/carousel/carousel";
import Choice from "./component/choice/choice";
import Recommend from "./component/recommend/recommend";
//---------------boo---------------------------------
import Menu from './component/menu/menu.js'
import cardMenu from './component/cardmenu/cardmenu.js'
//---------------been-----------------------------------
import Register from './component/register/register.js'
import Footer from './component/footer/footer.js'
//---------------pat------------------------------------
import Login from './component/login/mainlogin/login'
import Construct from './component/undercontruct/underconstruct'
const Home = () => {
  return [<Carousel />, <Recommend />, <Choice />];
};

{/*-------------Add path of page---------------*/}
class App extends Component {
  render() {
    return <div className="App">
        <Navbar />,<Switch>
          <Route exact path="/" component={Home} />
          <Route path="/demoaddmenu" component={Addmenu} />
          <Route path="/menu" component={Menu} />
          <Route path="/demoaddsnack" component={Addsnack} />
          <Route path="/cardmenu" component={cardMenu} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/construct" component={Construct} />
          <Route path="/snack" component={Snack} />
        </Switch>
        <Footer />
      </div>;
  }
}

export default App;
