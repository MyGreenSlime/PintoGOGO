import React, { Component} from 'react';
import '../cardmenu/cardmenu.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MenuDetail from "../menudetail/menudetail";

class cardMenu extends Component {
  constructor(props){
      super(props);
      this.state = {
        clicked : 0
      }
    }

  addToCartClick(id){
      console.log(id);
      
      this.setState({
          clicked : this.state.clicked+1
      })
      console.log(this.state.clicked);
  }  
  
  deleteFromDb(){
    axios.delete('http://localhost:4000/menus/food/del/'+ this.props.id)
    .then(res => console.log(res))
  }

  sendToMenuDetail(){
    
    return <div>
      <Route path="/menudetail/:menuId" component={MenuDetail} />
    </div>
  }

  render() {

  }

  render() { 
    const { isAuthenticated, user} = this.props.auth;
    const admin = (
        <React.Fragment>
            <div className="delete--snack__button" onClick={this.deleteFromDb.bind(this)}>
                <img src={"/img/other/delete.png"} height="20" />
            </div>
        </React.Fragment>
    )
    return <section className="menu">
        
        <div className="cardmenu__block">
            <Link to={'/menudetail/'+this.props.id}>
              <img src={this.props.picture} width="70%" className="cardmenu__image" onClick={this.sendToMenuDetail.bind(this)} />
            </Link>
        </div>

        <div className="textundermenu">
          <p>
            {this.props.name}
            <br />
            {this.props.calories} Kcal
          </p>
        </div>

        <div>
          <div className="cart--menu__button" onClick={this.addToCartClick.bind(this,this.props.id)}>
            <img src={"/img/other/cart.png"} height="20" />
          </div>
          {user.type? admin : ""}
        </div>
      </section>;
  }
}

cardMenu.propTypes = {
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps)(cardMenu);


