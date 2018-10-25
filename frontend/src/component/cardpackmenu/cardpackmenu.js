import React, { Component } from 'react';

class CardPackMenu extends Component {

    constructor(props){
        super(props);
    }

    render() { 
        return ( 
            <React.Fragment>
                <div>
                    <img src={this}/>
                </div>
            </React.Fragment>
         );
    }
}
 
export default CardPackMenu;