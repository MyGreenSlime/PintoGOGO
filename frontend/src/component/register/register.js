import React, {Component} from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
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

	handleSubmit(e) {
		// var pass = true
        // if(this.refs.first_name.value === '') {
        //     alert('Firstname is required')
        //     pass = false
        // }
        // if(this.refs.last_name.value === '') {
        //     alert('Lastname is required')
        //     pass = false
        // }
        // if(this.refs.email.value === '') {
        //     alert('Email is required')
        //     pass = false
        // }
        // if(this.refs.user_name.value === '') {
        //     alert('user_name is required')
        //     pass = false
        // }
        // if(this.refs.password1.value === '') {
        //     alert('password1 is required')
        //     pass = false
        // }
        // if(this.refs.password2.value === '') {
        //     alert('password2 is required')
        //     pass = false
        // }
        // if(this.refs.phonenumber.value === '') {
        //     alert('Phonenumber is required')
        //     pass = false
		// 		}
		// 		if(this.refs.address.value === '') {
        //     alert('Address is required')
        //     pass = false
        // }	
        // if(pass) {
        //     this.setState({user : {
        //         first_name : this.refs.first_name.value,
        //         last_name : this.refs.last_name.value,
        //         email : this.refs.email.value,
        //         user_name : this.refs.user_name.value,
        //         password1 : this.refs.password1.value,
        //         password2 : this.refs.password2.value,
		// 		phonenumber : this.refs.phonenumber.value,
		// 		address : this.refs.address.value
        //     }}, function() {
        //         console.log(this.state.user);
        //         RestClient.post("http://localhost:4000/users/register",this.state.user)
                
        //     })
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
		console.log(this.state.status)
        e.preventDefault();
    }    

  render() {
    return (
      <Container> 
				<div className="register-box">
        <h2>SIGN UP</h2>
				<br></br>
		  <Form>
			<Row  >
			  <Col className="col-md-6 col-12" >
        	<FormGroup row >
        		<Label className='text-form-left' for="Firstname" sm={6}>Firstname*</Label>
      	  	<Col>
							<Input className='input-form-left' type="text" id="Firstname" onChange={this.onChangeFirstname} value={this.state.first_name} />
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Lastname" sm={6}>Lastname*</Label>
      	  	<Col>
							<Input className='input-form-left' type="text" id="Lastname" onChange={this.onChangeLastname} value={this.state.last_name}/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Username" sm={6}>Username*</Label>
      	  	<Col>
							<Input className='input-form-left' type="text" id="Username" onChange={this.onChangeUsername} value={this.state.user_name}/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Password" sm={6}>Password*</Label>
      	  	<Col>
							<Input className='input-form-left' type="password" id="Password" onChange={this.onChangePassword1} value={this.state.password1}/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="ConfirmPassword" sm={6}>Confirm Password*</Label>
      	  	<Col>
							<Input className='input-form-left' type="password" id="ConfirmPassword" onChange={this.onChangePassword2} value={this.state.password2}/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Email" sm={6}>E-mail*</Label>
      	  	<Col>
							<Input className='input-form-left' type="email" id="Email" onChange={this.onChangeEmail} value={this.state.email}/>
			    	</Col>
					</FormGroup>
					{/* <FormGroup row>
						<Label className='text-form-left' for="PhoneNumber" sm={6}>Phone Number*</Label>
      	  	<Col>
							<input className='input-form-left' type="text" id="PhoneNumber" ref="phonenumber"/>
			    	</Col>
        	</FormGroup>
					<FormGroup className='text-form-right'> 
        		<Label for="Address">Address(Defualt)</Label>
						<input className='input-addr' type="textarea" id="Address" ref="address"/>
					</FormGroup> */}
				</Col>

				<Col className="col-md-6 col-12" >
					<Form inline>
						<Label className='text-form-right' for="PhoneNumber" >Phone Number* &nbsp;&nbsp;</Label>
						<Input className='input-form-right' type="text" id="PhoneNumber" onChange={this.onChangePhonenumber} value={this.state.phonenumber}/>
        	</Form>
					<Form className='text-form-right'> 
        		<Label for="Address">Address(Defualt)</Label>
						<Input className='input-addr' type="textarea" id="Address" onChange={this.onChangeAddress} value={this.state.address}/>
					</Form>
					<Form inline> 
						<Label className='text-form-right' for="Payment">Payment Method&nbsp;&nbsp;</Label>
						<Input className='input-form-card' type="select" id="Payment">
							<option>Visa</option>
        					<option>Mastercard</option>
						</Input>
					</Form> 
					<FormGroup row>
						<Col className='text-form-right'> 
							<Label for="CardNumber">Card Number</Label>
							<Input className='input-form-cardno' type="text" id="CardNumber"/>
						</Col>
						<Col className='text-form-right'> 
							<Label for="CVV">CVV</Label>
							<Input className='input-form-cvv' type="text" id="CVV"/>
						</Col>
					</FormGroup>
					<Form inline>
						<Label className='text-form-right' for="EXP">Expired&nbsp;&nbsp;</Label>
						<Input className='input-form-expired' type="text" id="EXPMonth"/>
						<Label>&nbsp;&nbsp;/&nbsp;&nbsp;</Label>
						<Input className='input-form-expired' type="text" id="EXPYear"/>
					</Form>
				</Col> 
			</Row>
      </Form>
			<Button type = 'submit' width='auto' className='button-confirm' onClick={this.handleSubmit.bind(this)}> COMFIRM </Button> 
			</div> 
      </Container>
    );
  }
}

export default Register;