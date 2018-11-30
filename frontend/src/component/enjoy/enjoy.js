import React, {Component} from 'react';
import "../enjoy/enjoy.css"
import axios from 'axios'
import {getProfile} from "../api/api";

class Enjoy extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            currentUser: null,
            bill: null
        }
    }
    
    componentDidMount(){
        axios.get("api/bills/current")
        .then(res => {
            this.setState({
                bill: res.data
            });
        })
        .then(() => {
            const get_user = getProfile.bind(this, "currentUser", "isLoaded");
            get_user();
        })
        .then(() => {
            // console.log("whole bill: ", this.state.bill);
            // console.log("order: ", this.state.bill.order);
            // console.log(this.state.isLoaded);
        })
    }

    render() {
        if (!!!this.state.isLoaded) {
            return <React.Fragment />;
          }
          {
            console.log("....", this.state.currentUser);
          }
        
        return <React.Fragment>
            <div className="set-screen-enjoy">
              <div className="enjoy__container">
                <img src="img/login/icon.png" width="20%" />
                <div>Enjoy your food...</div>
              </div>
              <div>Your order id: {this.state.bill._id}</div>
            </div>
          </React.Fragment>;
    }
}
export default Enjoy;