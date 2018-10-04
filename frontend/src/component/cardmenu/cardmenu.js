import React, { Component} from 'react';
import '../cardmenu/cardmenu.css';
import { Container, Row, Col,CardImg } from 'reactstrap';
class cardMenu extends Component {
    
    render() {
        
        return (
            
            <div>
                <div className="picture">
                    {/* change height->auto */}
                    <CardImg src={this.props.picture} height="170" width="170"/>
                </div>
                <div className="textunderpicture">
                    <p>{this.props.name}<br/>
                    {this.props.calories} Kcal</p>
                </div>
                
            </div>
            );
        }
    }
    

export default cardMenu;