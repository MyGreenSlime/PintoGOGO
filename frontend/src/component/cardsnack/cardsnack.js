import React, { Component} from 'react';
import '../cardsnack/cardsnack.css';
import { Container, Row, Col} from 'reactstrap';
import axios from 'axios';
 
export default class cardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
          clicked : 0,
          id : String(this.props.id)
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
        // axios.delete('http://localhost:4000/menus/snack/del/'+ this.state.id)
        //     .then(res => console.log(res))
    }
    
    render() { 
        
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
                    <div className="delete--snack__button" onClick={this.deleteFromDb.bind(this)}>
                        <img src={"/img/other/delete.png"} height="20" />
                    </div>
                </div>
                    {/* <p>total click: {this.state.clicked}</p> */}
            </section>
                
            
        );
    }
}



