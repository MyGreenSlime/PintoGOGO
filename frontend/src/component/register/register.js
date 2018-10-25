import React, {Component} from 'react';
import './register.css';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'

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
			status : {},
			errors : {}
		}
		this.handleChange = this.handleChange.bind(this)
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
	
	handleChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleSubmit(e) {
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
    e.preventDefault();
  }    
      
    render() {
			const {errors} = this.state

    return (
      <div className='set-screen'> {/*bg*/}
        <div className='register-box'> {/*register box*/}
          <h2> SIGN UP </h2>
          <br/>
          <form noValidate onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-md-6 col-12'>
              <div className='form-left'> {/*left form*/}
                <div className='form-group row'>
                  <label className='control-label text-form-left' htmlFor="Firstname" >Firstname*</label> 
    	  	        <div className='col'>  
										<input
											className= {classnames("form-control",{
												'is-invalid' : errors.first_name
											})}
											name="first_name" 
											type="text" 
											id="Firstname" 
											placeholder = "Firstname"
											onChange={this.handleChange} 
											value={this.state.first_name} 
										/>
										{errors.first_name && (<div className="invalid-feedback">{errors.first_name}</div>)}
		    	        </div> 
                </div>
                <div className='form-group row'>
					        <label className='control-label text-form-left' htmlFor="Lastname" >Lastname*</label>
    	  	        <div className='col'>
										<input 
											className= {classnames("form-control",{
												'is-invalid' : errors.last_name
											})}
											type="text" 
											name="last_name" 
											id="Lastname" 
											placeholder = "Lastname"
											onChange={this.handleChange} 
											value={this.state.last_name} 
										/>			    	        
										{errors.last_name && (<div className="invalid-feedback">{errors.last_name}</div>)}
									</div>
					      </div>
                <div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="Username" >Username*</label>
      	  	      <div className='col'>
							      <input 
											type="text" 
											className= {classnames("form-control",{
												'is-invalid' : errors.user_name
											})}
											name="user_name" 
											id="Username" 
											placeholder = "Username"
											onChange={this.handleChange} 
											value={this.state.user_name} 
										/>
										{errors.user_name && (<div className="invalid-feedback">{errors.user_name}</div>)}
			    	      </div>
					      </div>
								<div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="Password">Password*</label>
      	  	      <div className='col'>
							      <input 
											type="password"
											className= {classnames("form-control",{
												'is-invalid' : errors.password1
											})}
											name="password1" 
											id="Password" 
											placeholder = "password must least 6 character"
											onChange={this.handleChange} 
											value={this.state.password1} 
										/>
										{errors.password1 && (<div className="invalid-feedback">{errors.password1}</div>)}
      			    	</div>
			      		</div> 
					      <div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="ConfirmPassword">Confirm Password*</label>
      	  	      <div className='col'>
							      <input 
											type="password" 
											className= {classnames("form-control",{
												'is-invalid' : errors.password2
											})}
											name="password2" 
											id="ConfirmPassword" 
											placeholder = "Comfirm Password must least 6 character"
											onChange={this.handleChange} 
											value={this.state.password2} 
										/>
										{errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
      			    	</div>
			      		</div> 
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className='form-right'> {/*right form*/}
								<div className='form-group row'>
			      			<label className='control-label text-form-left' htmlFor="Email">E-mail*</label>
            	  	<div className='col'>
			      				<input 
											type="email" 
											className= {classnames("form-control",{
												'is-invalid' : errors.email
											})} 
											name="email" 
											id="Email" 
											placeholder = "Email"
											onChange={this.handleChange} 
											value={this.state.email} 
										/>
											{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
			    	      </div>
      					</div>
                <div className='form-group row'>
                  <label className='control-label text-form-left' htmlFor="PhoneNumber">Phone Number* &nbsp;&nbsp;</label>
						      <div className='col'>
                    <input 
											type="text" 
											className= {classnames("form-control",{
												'is-invalid' : errors.phonenumber
											})} 
											name="phonenumber" 
											id="PhoneNumber" 
											placeholder = "Phone number"
											onChange={this.handleChange} 
											value={this.state.phonenumber} 
											/>
											{errors.phonenumber && (<div className="invalid-feedback">{errors.phone}</div>)}
									</div>
                </div>
                <div className='form-group'>
                  <label className='control-label text-form-right' htmlFor="Address" sm={12}>Address(Default)</label>
                  <div className='col'>
										<input 
											className= {classnames("form-control addr",{
												'is-invalid' : errors.address
											})} 
											name="address" 
											type="textarea" 
											id="Address" 
											placeholder = "Your address"
											onChange={this.handleChange} 
											value={this.state.address}
										/>
										{errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
					<br/>
					<button width='auto' type='submit' className='btn button-confirm'> COMFIRM </button>
          </form>
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
