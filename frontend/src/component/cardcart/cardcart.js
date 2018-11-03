import React, { Component} from 'react';
import propTypes from 'prop-types';
import '../cardcart/cardcart.css';

class CardCart extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.interval = setInterval(() => this.submitHandler(), 1000);
        this.state = {
            inputField: this.props.amount
        }
    }

    submitHandler() {
        this.props.handlerFromParant(this.state.inputField,this.props.price,this.props.id);
    }

    handleChange(event) {
        console.log('event')
        this.setState({
          inputField: event.target.value
        });
      }
  
    increment(){
        console.log();
        this.setState({
            inputField: this.state.inputField +1
        })
    }  
    
    decrement(){
        console.log();
        if(this.state.inputField > 0){
            this.setState({
                inputField: this.state.inputField -1
            })
        }
    }  

    render(){
        return <React.Fragment>
            <div className="cardcartbox">
                <hr></hr>
                <div className="row rowcard">
                    <div className="col-3 img__block">
                        <img src={this.props.picture} width="60%" className="cardcart__image"/>
                    </div>
                    <div className="col-3 menuname__block">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="col-3 editamount">
                        <div className="row">
                        
                            <div className="minusbutton " onClick = {this.decrement.bind(this)}>
                                <img src={"/img/cart/minus.png"} width="20px"/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder={this.state.inputField} 
                                value={this.state.inputField} onChange={this.handleChange} style={{width: "50px" , height:"30px"}} />
                            </div>
                            <div className="addbutton" onClick = {this.increment.bind(this)}>
                                <img src={"/img/cart/add.png"} width="20px" />
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="menuprice">
                            <p>{this.props.price}</p>
                        </div>
                    </div>
                </div>
                
            </div>
            
            
            
        </React.Fragment>
    }
}

CardCart.propTypes = {
    name: propTypes.string,
    amount: propTypes.number
};

export default CardCart;