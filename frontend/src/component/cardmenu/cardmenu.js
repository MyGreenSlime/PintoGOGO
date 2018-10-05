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

    imageClick(e){
        console.log('Click!!!!');
        this.setState({
            clicked : this.state.clicked+1
        })
        e.preventDefault();
    }  
    
    render() { 
        return (
            <div>
                
                <card>
                    <img width="70%" src={this.props.picture} className="picture"/>
                </card>
                
                <div className="undermenu">
                    <div className="textundermenu">
                        <p>{this.props.name}<br/>
                        {this.props.calories} Kcal</p>
                    </div>
                    <div className="cartbutton"  onClick ={this.imageClick.bind(this)}>
                        <img src={"/img/other/cart.png"} height="20"/>
                            {
                            // this.state.clicked 
                            // <div>You clicked me!</div>
                            }
                    </div>  
                </div>
                
                {/* <p>total click: {this.state.clicked}</p> */}
            
            </div>
            
        );
    }
}



