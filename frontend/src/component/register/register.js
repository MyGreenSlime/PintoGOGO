import React, {Component} from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, formText, Alert,ReactDOM } from 'reactstrap';
import './register.css';
import { RestClient } from '../api/api'
import axios from 'axios'
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'

class Register extends Component {
	constructor(){
		super();
    this.state = {
			first_name : "",
			last_name : "",
			email : "",
			user_name : "",
			password1 : "",
			password2 : "",
			phonenumber : "",
			address : "",
      errors : {}
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
	
	componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({errors : nextProps.errors});
    }
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
		e.preventDefault();
    const newUser = {
			first_name : this.state.first_name,
			last_name : this.state.last_name,
			user_name : this.state.user_name,
			email : this.state.email,
			password1 : this.state.password1,
			password2 : this.state.password2,
			phonenumber : this.state.phonenumber,
			address : this.state.address
		}
		
		this.props.registerUser(newUser, this.props.history)
  }    
      
    render() {
			const {errors} = this.state

    return (
      <div className='set-screen'> {/*bg*/}
        <div className='register-box'> {/*register box*/}
          <h2> SIGN UP </h2>
          <br/>
          <AvForm className='form' onSubmit={this.handleSubmit}>
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
										/>
										 {errors.first_name && (<div className="invalid-feedback">{errors.first_name}</div>)}
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
										/>			    	        
										<AvFeedback>{errors.last_name}</AvFeedback> 
									</Col>
					      </AvGroup>
                <AvGroup row>
						      <Label className='text-form-left' for="Username" >Username*</Label>
      	  	      <Col>
							      <AvInput 
											type="text" 
											name="username" 
											id="Username" 
											onChange={this.onChangeUsername} 
											value={this.state.user_name} 
										/>
										<AvFeedback>{errors.user_name}</AvFeedback>
			    	      </Col>
					      </AvGroup>
								<AvGroup row>
						      <Label className='text-form-left' for="Password">Password*</Label>
      	  	      <Col>
							      <AvInput 
											type="password" 
											name="password" 
											id="Password" 
											onChange={this.onChangePassword1} 
											value={this.state.password1} 
										/>
										<AvFeedback>{errors.password1}</AvFeedback>
      			    	</Col>
			      		</AvGroup> 
					      <AvGroup row>
						      <Label className='text-form-left' for="ConfirmPassword">Confirm Password*</Label>
      	  	      <Col>
							      <AvInput 
											type="password" 
											name="confirmpassword" 
											id="ConfirmPassword" 
											onChange={this.onChangePassword2} 
											value={this.state.password2} 
										/>
										<AvFeedback>{errors.password2}</AvFeedback>
      			    	</Col>
			      		</AvGroup> 
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
										/>
										<AvFeedback>{errors.email}</AvFeedback>
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
										/>
										<AvFeedback>{errors.phonenumber}</AvFeedback>
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
										value={this.state.address}
										/>
										s<AvFeedback>{errors.address}</AvFeedback>
                  </Col>
                </AvGroup>
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

Register.propTypes = {
	registerUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth : state.auth,
	errors : state.errors
})


export default connect(mapStateToProps, { registerUser })(withRouter(Register));