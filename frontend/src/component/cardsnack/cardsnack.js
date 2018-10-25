import React, { Component} from 'react';
import '../cardsnack/cardsnack.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

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
        e.preventDefault();
    }  

    deleteFromDb(){
        axios.delete('http://localhost:4000/menus/snack/del/'+ this.props.id)
        .then(res => console.log(res))
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
        return (
            
            <section className="snack">
                <div className="cardsnack__block">
                    <img src={this.props.picture} width="200px" className="cardsnack__image"/>
                </div>
                <div className="textundersnack">
                        <p>{this.props.name}<br/>
                        {this.props.calories} Kcal</p>
                </div>
                <div>
                    <div className="cart--snack__button" onClick={this.addToCartClick.bind(this)}>
                        <img src={"/img/other/cart.png"} height="20" />
                    </div>
                    {user.type ? admin : ""}
                </div>
                    {/* <p>total click: {this.state.clicked}</p> */}
            </section>
                
            
        );
    }
}
cardMenu.propTypes = {
    auth: propTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  })
  

export default connect(mapStateToProps)(cardMenu);
