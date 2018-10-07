import React, {Component} from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, formText, Alert,ReactDOM } from 'reactstrap';
import './register.css';
import { RestClient } from '../api/api'
import axios from 'axios'
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';

class Register extends Component {
	constructor(props){
		super(props);
    this.state = {
			first_name : "",
			last_name : "",
			email : "",
			user_name : "",
			password1 : "",
			password2 : "",
			phonenumber : "",
			address : "",
      status : {}
    }
    this.baseState = this.state
		this.onChangeFirstname = this.onChangeFirstname.bind(this)
		this.onChangeLastname = this.onChangeLastname.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangePassword1 = this.onChangePassword1.bind(this)
		this.onChangePassword2 = this.onChangePassword2.bind(this)
		this.onChangePhonenumber = this.onChangePhonenumber.bind(this)
		this.onChangeAddress = this.onChangeAddress.bind(this)
		this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }
  onChangeFirstname(e) {
		this.setState({
			first_name : e.target.value 
		})
	}

	onChangeLastname(e) {
		this.setState({
			last_name : e.target.value 
		})
	}

	onChangeEmail(e) {
		this.setState({
			email : e.target.value 
		})
	}
	
	onChangeUsername(e) {
		this.setState({
			user_name : e.target.value 
		})
	}

	onChangePassword1(e) {
		this.setState({
			password1 : e.target.value 
    })
	}

	onChangePassword2(e) {
		this.setState({
			password2 : e.target.value 
		})
	}

	onChangePhonenumber(e) {
		this.setState({
			phonenumber : e.target.value 
		})
	}

	onChangeAddress(e) {
		this.setState({
			address : e.target.value 
		})
	}

  resetForm = () => {
    this.setState(this.baseState)
  }

	handleValidSubmit(e) {
    const userDetail = {
			first_name : this.state.first_name,
			last_name : this.state.last_name,
			user_name : this.state.user_name,
			email : this.state.email,
			password1 : this.state.password1,
			password2 : this.state.password2,
			phonenumber : this.state.phonenumber,
			address : this.state.address
		}
		console.log(userDetail)
		RestClient.post("http://localhost:4000/users/register",userDetail)
		.then(resstatus => this.setState({status : resstatus}));
		console.log(this.state.status)
        e.preventDefault();
    }    
      
    render() {
    return (
      <div className='set-screen'> {/*bg*/}
        <div className='register-box'> {/*register box*/}
          <h2> SIGN UP </h2>
          <br/>
          <AvForm className='form' onValidSubmit={this.handleValidSubmit}>
          <Row>
            <Col className="col-md-6 col-12">
              <div className='form-left'> {/*left form*/}
                <AvGroup row>
                   <Label className='text-form-left' for="Firstname" >Firstname*</Label> 
    	  	        <Col>  
						        <AvInput 
											name="firstname" 
											type="text" 
											id="Firstname" 
											onChange={this.onChangeFirstname} 
											value={this.state.first_name} 
											required/>
										<AvFeedback >Firstname is required!</AvFeedback>
		    	        </Col> 
                </AvGroup>
                <AvGroup row>
					        <Label className='text-form-left' for="Lastname" >Lastname*</Label>
    	  	        <Col>
						        <AvInput 
											type="text" 
											name="lastname" 
											id="Lastname" 
											onChange={this.onChangeLastname} 
											value={this.state.last_name} 
											required/>			    	        
										<AvFeedback>Lastname is required!</AvFeedback> 
									</Col>
					      </AvGroup>
                <AvGroup row>
						      <Label className='text-form-left' for="Username" >Username*</Label>
      	  	      <Col>
							      <AvInput 
											type="text" 
											name="username" 
											id="Username" 
											minLength="4"
											placeholder="at least 4 characters"
											onChange={this.onChangeUsername} 
											value={this.state.user_name} 
											required/>
										<AvFeedback>Username is required!</AvFeedback>
			    	      </Col>
					      </AvGroup>
								<AvGroup row>
						      <Label className='text-form-left' for="Password">Password*</Label>
      	  	      <Col>
							      <AvInput 
											type="password" 
											name="password" 
											id="Password" 
											minLength="8"
											placeholder="at least 8 characters"
											onChange={this.onChangePassword1} 
											value={this.state.password1} 
											required/>
										<AvFeedback>Password is required!</AvFeedback>
      			    	</Col>
			      		</AvGroup> 
					      <AvGroup row>
						      <Label className='text-form-left' for="ConfirmPassword">Confirm Password*</Label>
      	  	      <Col>
							      <AvInput 
											type="password" 
											name="confirmpassword" 
											id="ConfirmPassword" 
											minLength="8"
											placeholder="at least 8 characters"
											onChange={this.onChangePassword2} 
											value={this.state.password2} 
											required/>
										<AvFeedback>Confirm password is required!</AvFeedback>
      			    	</Col>
			      		</AvGroup> 
      					{/* <AvGroup row>
			      			<Label className='text-form-left' for="Email">E-mail*</Label>
            	  	<Col>
			      				<AvInput type="email" id="Email" onChange={this.onChangeEmail} value={this.state.email} required/>
			    	      </Col>
      					</AvGroup>
                <AvGroup row>
                  <Label className='text-form-left' for="PhoneNumber">Phone Number* &nbsp;&nbsp;</Label>
						      <Col>
                    <AvInput type="text" id="PhoneNumber" onChange={this.onChangePhonenumber} value={this.state.phonenumber} required/>
                  </Col>
                </AvGroup> */}
              </div>
            </Col>
            <Col className="col-md-6 col-12">
              <div className='form-right'> {/*right form*/}
								<AvGroup row>
			      			<Label className='text-form-left' for="Email">E-mail*</Label>
            	  	<Col>
			      				<AvInput 
											type="email" 
											name="email" 
											id="Email" 
											onChange={this.onChangeEmail} 
											value={this.state.email} 
											required/>
										<AvFeedback>Email is required!</AvFeedback>
			    	      </Col>
      					</AvGroup>
                <AvGroup row>
                  <Label className='text-form-left' for="PhoneNumber">Phone Number* &nbsp;&nbsp;</Label>
						      <Col>
                    <AvInput 
											type="text" 
											name="phonenumber" 
											id="PhoneNumber" 
											maxLength={10}
											onChange={this.onChangePhonenumber} 
											value={this.state.phonenumber} 
											required/>
										<AvFeedback>PhoneNumber is required!</AvFeedback>
									</Col>
                </AvGroup>
                <AvGroup row>
                  <Label className='text-form-right' for="Address" sm={12}>Address(Default)</Label>
                  <Col>
						      	<AvInput 
										className='addr' 
										name="address" 
										type="textarea" 
										id="Address" 
										onChange={this.onChangeAddress} 
										value={this.state.address}/>
                  </Col>
                </AvGroup>
                {/* <AvGroup row> 
						      <Label className='text-form-right' className='payment' for="Payment">Payment Method&nbsp;&nbsp;</Label>
                  <Col sm={6}>
						        <AvInput type="select" id="Payment">
                      <option>None</option>
							        <option>Visa</option>
        			        <option>Mastercard</option>
						        </Input>
                  </Col>
					      </AvGroup> 
                <AvGroup row>
						      <Col className='text-form-right' sm={7}> 
							      <Label for="CardNumber">Card Number</Label>
							      <AvInput type="text" id="CardNumber"/>
						      </Col>
						      <Col className='text-form-right'sm={3}> 
							      <Label for="CVV">CVV</Label>
							      <Input className='input-form-cvv' type="text" id="CVV"/>
						      </Col>
                </AvGroup>
                <AvGroup row>
						      <Label className='exp' for="EXP">Expired&nbsp;&nbsp;</Label>
                  <Col>
						      <AvInput type="text" id="EXPMonth" placeholder="month"/>
					        </Col>
                  <Label className='slash'>/</Label>
                  <Col>
					        <AvInput type="text" id="EXPYear" placeholder="year"/>
                  </Col>
                  <Label sm={2}>&nbsp;&nbsp;</Label>
				        </AvGroup> */}
              </div>
            </Col>
          </Row>
					<br/>
					<Button width='auto' className='button-confirm'> COMFIRM </Button>
          </AvForm>
        </div>
      </div>
    
    );
  }
}

export default Register;