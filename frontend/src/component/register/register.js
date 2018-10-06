import React, {Component} from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, formText, Alert,ReactDOM } from 'reactstrap';
import './register.css';
import { RestClient } from '../api/api'
import axios from 'axios'

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
	this.handleSubmit = this.handleSubmit.bind(this)
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

	handleSubmit(e) {
    // if(this.state.first_name === ''){
    //   alert('required')
    // }
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
		//console.log(this.state.status)
        e.preventDefault();
    }    
      
    render() {
    return (
      <div className='set-screen'> {/*bg*/}
        <div className='register-box'> {/*register box*/}
          <h2> SIGN UP </h2>
          <br/>
          <Form className='form'>
          <Row>
            <Col className="col-md-6 col-12">
              <div className='form-left'> {/*left form*/}
                <FormGroup row>
                   <Label className='text-form-left' for="Firstname" >Firstname*</Label> 
    	  	        <Col>  
						        <Input type="text" id="Firstname" onChange={this.onChangeFirstname} value={this.state.first_name} required/>
		    	        </Col>  
                </FormGroup>
                <FormGroup row>
					        <Label className='text-form-left' for="Lastname" >Lastname*</Label>
    	  	        <Col>
						        <Input type="text" id="Lastname" onChange={this.onChangeLastname} value={this.state.last_name} required/>			    	        
                  </Col>
					      </FormGroup>
                <FormGroup row>
						      <Label className='text-form-left' for="Username" >Username*</Label>
      	  	      <Col>
							      <Input type="text" id="Username" onChange={this.onChangeUsername} value={this.state.user_name} required/>
			    	      </Col>
					      </FormGroup>
					       <FormGroup row>
						      <Label className='text-form-left' for="Password">Password*</Label>
      	  	      <Col>
							      <Input type="password" id="Password" onChange={this.onChangePassword1} value={this.state.password1} reqiured/>
			    	      </Col>
					      </FormGroup>
					      <FormGroup row>
						      <Label className='text-form-left' for="ConfirmPassword">Confirm Password*</Label>
      	  	      <Col>
							      <Input type="password" id="ConfirmPassword" onChange={this.onChangePassword2} value={this.state.password2} required/>
      			    	</Col>
			      		</FormGroup> 
      					<FormGroup row>
			      			<Label className='text-form-left' for="Email">E-mail*</Label>
            	  	<Col>
			      				<Input type="email" id="Email" onChange={this.onChangeEmail} value={this.state.email} required/>
			    	      </Col>
      					</FormGroup>
                <FormGroup row>
                  <Label className='text-form-left' for="PhoneNumber">Phone Number* &nbsp;&nbsp;</Label>
						      <Col>
                    <Input type="text" id="PhoneNumber" onChange={this.onChangePhonenumber} value={this.state.phonenumber} required/>
                  </Col>
                </FormGroup>
              </div>
            </Col>
            <Col className="col-md-6 col-12">
              <div className='form-right'> {/*right form*/}
                <FormGroup row>
                  <Label className='text-form-right' for="Address" sm={12}>Address(Default)</Label>
                  <Col>
						      <Input className='addr' type="textarea" id="Address" onChange={this.onChangeAddress} value={this.state.address}/>
                  </Col>
                </FormGroup>
                <FormGroup row> 
						      <Label className='text-form-right' className='payment' for="Payment">Payment Method&nbsp;&nbsp;</Label>
                  <Col sm={6}>
						        <Input type="select" id="Payment">
                      <option>None</option>
							        <option>Visa</option>
        			        <option>Mastercard</option>
						        </Input>
                  </Col>
					      </FormGroup> 
                <FormGroup row>
						      <Col className='text-form-right' sm={7}> 
							      <Label for="CardNumber">Card Number</Label>
							      <Input type="text" id="CardNumber"/>
						      </Col>
						      <Col className='text-form-right'sm={3}> 
							      <Label for="CVV">CVV</Label>
							      <Input className='input-form-cvv' type="text" id="CVV"/>
						      </Col>
                </FormGroup>
                <FormGroup row>
						      <Label className='exp' for="EXP">Expired&nbsp;&nbsp;</Label>
                  <Col>
						      <Input type="text" id="EXPMonth" placeholder="month"/>
					        </Col>
                  <Label className='slash'>/</Label>
                  <Col>
					        <Input type="text" id="EXPYear" placeholder="year"/>
                  </Col>
                  <Label sm={2}>&nbsp;&nbsp;</Label>
				        </FormGroup>
              </div>
            </Col>
          </Row>
          </Form>
          <br/>
          <Button width='auto' className='button-confirm' onClick={this.handleSubmit.bind(this)}> COMFIRM </Button>
        </div>
      </div>
    
    );
  }
}

export default Register;