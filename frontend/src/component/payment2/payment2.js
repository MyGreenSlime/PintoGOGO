import React, { Component } from "react";
import "../payment2/payment2.css";
import axios from 'axios'
//Hacked By Babe
class Payment2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        axios
          .get("api/users/profile")
          .then(res => {
            this.setState({
              profile: res.data,
              isLoaded: true
            });
          })
          .then(() => {
            console.log("order ", this.state.order);
          });
    }

    render() {
        return (
        <React.Fragment>
            <form>
                <div className=" card payment__box__container">
                    <strong>PAYMENT DETAIL  </strong>
                    <br/>
                    <div class="row icons">
                        <div className="col-md-4 col-2" />
                        <i className="fa fa-cc-visa fa-2x col-md-1 col-2" aria-hidden="true"></i>
                        <i className="fa fa-cc-mastercard fa-2x col-md-1 col-2" aria-hidden="true"></i>
                        <i className="fa fa-cc-discover fa-2x col-md-1 col-2" aria-hidden="true"></i>
                        <i className="fa fa-cc-amex fa-2x col-md-1 col-2" aria-hidden="true"></i>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            CARD NUMBER
                            <div className="form-group">
                                <div className="col payment__box--position">
                                    <input type="text" className="form-control"
                                    placeholder="card number"
                                    // value={this.state.inputField}
                                    // onChange={this.handleChange}
                                    // style={{ width: "30%", height: "30px" }}
                                    required />
                                </div>
                            </div>
                            EXPIRAATION DATE
                            <div className="form-group">
                                <div className="col payment__box--position">
                                    <input type="text" className="form-control"
                                    placeholder="MM/YY"
                                    // style={{ width: "35%", height: "30px" }}
                                    required />
                                </div>
                            </div>
                            CVC CODE
                            <div className="form-group">
                                <div className="col payment__box--position">
                                    <input type="text" className="form-control"
                                    placeholder="cvc code"
                                    // style={{ width: "35%", height: "30px" }}
                                    required />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                TOTAL PRICE
                            </div>
                            <div className="row">
                                Customer name
                            </div>
                            <div className="row">
                                ADDRESS
                            </div>
                        </div>
                    </div>
                    <a href="/">
                        <button
                        className="btn button--confirm"
                        onClick={this.confirmButtonClicked}>
                        CONFIRM PAYMENT
                        </button>
                    </a>
                </div>
            </form>
            
        </React.Fragment>
        );
    }
}
export default Payment2;
