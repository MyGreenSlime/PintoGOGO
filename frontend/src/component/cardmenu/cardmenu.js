import React, { Component} from 'react';
import '../cardmenu/cardmenu.css';
import { Container, Row, Col} from 'reactstrap';

 
export default class cardMenu extends Component {
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
              <div className="delete--menu__button" onClick={this.deleteFromDb.bind(this)}>
                <img src={"/img/other/delete.png"} height="20" />
              </div>
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



