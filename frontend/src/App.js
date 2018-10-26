import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
//---------------don--------------------------------
import DemoMenu from './component/demomenu'
import Addmenu from './component/demoaddmenu'
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
import Package from './component/package/package.js'
import PackageManage from './component/packagemanage/packagemanage'
//---------------pat------------------------------------
import Login from './component/login/mainlogin/login'
// import Construct from './component/login/underconstruct'
const Home = () => {
  return [<Carousel />, <Recommend />, <Choice />, <Menu />];
};

{/*-------------Add path of page---------------*/}
class App extends Component {
 
  render() {
    return (

      <div className="App">
      
        {/* <Navbar />, */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/demomenu" component={DemoMenu} />
          <Route path="/demoaddmenu" component={Addmenu} />
          <Route path="/menu" component={Menu} />
          <Route path="/cardmenu" component={cardMenu} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/package" component={Package} />
          <Route path="/packagemanage" component={PackageManage} />
          {/* <Route path="/construct" component={Construct}/> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
