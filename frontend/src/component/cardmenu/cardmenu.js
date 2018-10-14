import React, { Component} from 'react';
import '../cardmenu/cardmenu.css';
import { Container, Row, Col} from 'reactstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
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
        console.log("delete");
        
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
              <img src={this.props.picture} width="200px" className="cardmenu__image" />
            </div>
            <div className="textundermenu">
              <p>
                {this.props.name}
                <br />
                {this.props.calories} Kcal
              </p>
            </div>

            <div>
              <div className="cart--menu__button" onClick={this.addToCartClick.bind(this)}>
                <img src={"/img/other/cart.png"} height="20" />
              </div>
              {user.type? admin : ""}
            </div>

            {/* <div className="inline">
                    <img src={"/img/other/cart.png"} height="20"/> 
                        
                </div> */}
            {/* <div>
                    <img src={"/img/other/cart.png"} height="20" /> 
                </div> */}
            {/* <p>total click: {this.state.clicked}</p> */}
          </section>;
    }
}

cardMenu.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser })(cardMenu);


