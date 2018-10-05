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
						        <Input type="text" id="Firstname" ref="first_name"/>
		    	        </Col>  
                </FormGroup>
                <FormGroup row>
					        <Label className='text-form-left' for="Lastname" >Lastname*</Label>
    	  	        <Col>
						        <Input type="text" id="Lastname" ref="last_name"/>			    	        
                  </Col>
					      </FormGroup>
                <FormGroup row>
						      <Label className='text-form-left' for="Username" >Username*</Label>
      	  	      <Col>
							      <Input type="text" id="Username" ref="user_name"/>
			    	      </Col>
					      </FormGroup>
					       <FormGroup row>
						      <Label className='text-form-left' for="Password">Password*</Label>
      	  	      <Col>
							      <Input type="password" id="Password" ref="password1"/>
			    	      </Col>
					      </FormGroup>
					      <FormGroup row>
						      <Label className='text-form-left' for="ConfirmPassword">Confirm Password*</Label>
      	  	      <Col>
							      <Input type="password" id="ConfirmPassword" ref="password2" />
      			    	</Col>
			      		</FormGroup> 
      					<FormGroup row>
			      			<Label className='text-form-left' for="Email">E-mail*</Label>
            	  	<Col>
			      				<Input type="email" id="Email" ref="email"/>
			    	      </Col>
      					</FormGroup>
                <FormGroup row>
                  <Label className='text-form-left' for="PhoneNumber">Phone Number* &nbsp;&nbsp;</Label>
						      <Col>
                    <Input type="text" id="PhoneNumber"/>
                  </Col>
                </FormGroup>
              </div>
            </Col>
            <Col className="col-md-6 col-12">
              <div className='form-right'> {/*right form*/}
                <FormGroup row>
                  <Label className='text-form-right' for="Address" sm={12}>Address(Default)</Label>
                  <Col>
						      <Input className='addr' type="textarea" id="Address"/>
                  </Col>
                </FormGroup>
                <FormGroup row> 
						      <Label className='text-form-right' className='payment' for="Payment">Payment Method&nbsp;&nbsp;</Label>
                  <Col sm={6}>
						        <Input type="select" id="Payment">
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
          <Button width='auto' className='button-confirm'> COMFIRM </Button>
        </div>
      </div>
    
    );
  }
}

export default Register;