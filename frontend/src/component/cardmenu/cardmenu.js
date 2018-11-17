import React, { Component} from 'react';
import '../cardmenu/cardmenu.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import MenuDetail from '../menudetail/menudetail'

class cardMenu extends Component {
  constructor(props){
      super(props);
      this.state = {
        clicked : 0
      }
    }

  addToCartClick(e){
      console.log('Click!!!!');
      this.setState({
          clicked : this.state.clicked+1
      })
      axios.put('/api/orders/add/food',{
        food_id: this.props.id,
        food_name: this.props.name,
        price: this.props.price
      })
      e.preventDefault();
  }  
  
  deleteFromDb(){
    axios.delete('/api/menus/food/del/'+ this.props.id)
    .then(res => console.log(res))
      
  }

  sendToMenuDetail(){
    return <div>
      <Route path="/menudetail/:menuId" component={MenuDetail}/>
    </div>
  }

  render() { 
    const { isAuthenticated, user} = this.props.auth;
    const admin = (
        <React.Fragment>
            <div className="cartmenu__button__delete" onClick={this.deleteFromDb.bind(this)}>
                <img src={"/img/other/delete.png"} height="20" />
            </div>
        </React.Fragment>
    )
    return <section className="menu">
        {/* block__element--modify */}
        <div className="cardmenu__image">
            <Link to={'/menudetail/'+this.props.id}>
              <img src={this.props.picture} width="70%" className="cardmenu__image--border" onClick={this.sendToMenuDetail.bind(this)} />
            </Link>
        </div>

        <div className="cardmenu__text">
          <p>
            {this.props.name}<br/>
            {this.props.calories} Kcal
          </p>
        </div>

        <div>
          <div className="cartmenu__cart" onClick={this.addToCartClick.bind(this)}>
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


