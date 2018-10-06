import React, {Component} from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, formText, Alert,ReactDOM } from 'reactstrap';
import '../../css/register.css';
import { postData } from '../api/api'

class Register extends Component {
	constructor(props){
				super(props);
        this.state = {
            user: {},
            status: {}
		}

  }    

  render() {
    return (
      <div className="set-screen">
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
							<input className='input-form-left' type="text" id="Firstname" ref="first_name"/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Lastname" sm={6}>Lastname*</Label>
      	  	<Col>
							<input className='input-form-left' type="text" id="Lastname" ref="last_name"/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Username" sm={6}>Username*</Label>
      	  	<Col>
							<input className='input-form-left' type="text" id="Username" ref="user_name"/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Password" sm={6}>Password*</Label>
      	  	<Col>
							<input className='input-form-left' type="password" id="Password" ref="password1"/>
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="ConfirmPassword" sm={6}>Confirm Password*</Label>
      	  	<Col>
							<input className='input-form-left' type="password" id="ConfirmPassword" ref="password2" />
			    	</Col>
					</FormGroup>
					<FormGroup row>
						<Label className='text-form-left' for="Email" sm={6}>E-mail*</Label>
      	  	<Col>
							<input className='input-form-left' type="email" id="Email" ref="email"/>
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
						<Input className='input-form-right' type="text" id="PhoneNumber"/>
        	</Form>
					<Form className='text-form-right'> 
        		<Label for="Address">Address(Defualt)</Label>
						<Input className='input-addr' type="textarea" id="Address"/>
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
			{/* <Button width='auto' className='button-confirm' onClick={this.handleSubmit.bind(this)}> COMFIRM </Button>  */}
			</div> 
      </Container>
      </div>
    );
  }
}

export default Register;