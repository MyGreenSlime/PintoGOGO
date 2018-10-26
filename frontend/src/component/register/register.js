import React, {Component} from 'react';
import './register.css';
import { RestClient } from '../api/api'

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
          <form className="needs-validation form" novalidate >
          <div className='row'>
            <div className='col-md-6 col-12'>
              <div className='form-left'> {/*left form*/}
                <div className='form-group row'>
                  <label className='control-label text-form-left' for="Firstname" >Firstname*</label> 
    	  	        <div className='col'>  
										<input
											className='form-control' 
											name="firstname" 
											type="text" 
											id="Firstname" 
											onChange={this.onChangeFirstname} 
											value={this.state.first_name} 
											required/>
										<div className='invalid-tooltip'>
											Firstname is required!
										</div>
		    	        </div> 
                </div>
                <div className='form-group row'>
					        <label className='control-label text-form-left' for="Lastname" >Lastname*</label>
    	  	        <div className='col'>
										<input 
											className='form-control' 
											type="text" 
											name="lastname" 
											id="Lastname" 
											onChange={this.onChangeLastname} 
											value={this.state.last_name} 
											required/>			    	        
										<div className='invalid-tooltip'>
											Lastname is required!
										</div>
									</div>
					      </div>
                <div className='form-group row'>
						      <label className='control-label text-form-left' for="Username" >Username*</label>
      	  	      <div className='col'>
							      <input 
											type="text" 
											className='form-control' 
											name="username" 
											id="Username" 
											minLength="4"
											placeholder="at least 4 characters"
											onChange={this.onChangeUsername} 
											value={this.state.user_name} 
											required/>
										<div className='invalid-tooltip'>
											Username is required!
										</div>
			    	      </div>
					      </div>
								<div className='form-group row'>
						      <label className='control-label text-form-left' for="Password">Password*</label>
      	  	      <div className='col'>
							      <input 
											type="password"
											className='form-control'  
											name="password" 
											id="Password" 
											minLength="8"
											placeholder="at least 8 characters"
											onChange={this.onChangePassword1} 
											value={this.state.password1} 
											required/>
										<div className='invalid-tooltip'>
											Password is required!
										</div>
      			    	</div>
			      		</div> 
					      <div className='form-group row'>
						      <label className='control-label text-form-left' for="ConfirmPassword">Confirm Password*</label>
      	  	      <div class='col'>
							      <input 
											type="password" 
											className='form-control' 
											name="confirmpassword" 
											id="ConfirmPassword" 
											minLength="8"
											placeholder="at least 8 characters"
											onChange={this.onChangePassword2} 
											value={this.state.password2} 
											required/>
											<div className='invalid-tooltip'>
												Confirm password is required!
											</div>
      			    	</div>
			      		</div> 
              </div>
            </div>
            <div className="col-md-6 col-12">
              <form className='form-right'> {/*right form*/}
								<div className='form-group row'>
			      			<label className='control-label text-form-left' for="Email">E-mail*</label>
            	  	<div className='col'>
			      				<input 
											type="email" 
											className='form-control' 
											name="email" 
											id="Email" 
											onChange={this.onChangeEmail} 
											value={this.state.email} 
											required/>
										<div className='invalid-tooltip'>
											Email is required!
										</div>
			    	      </div>
      					</div>
                <div className='form-group row'>
                  <label className='control-label text-form-left' for="PhoneNumber">Phone Number* &nbsp;&nbsp;</label>
						      <div className='col'>
                    <input 
											type="text" 
											className='form-control' 
											name="phonenumber" 
											id="PhoneNumber" 
											maxLength={10}
											onChange={this.onChangePhonenumber} 
											value={this.state.phonenumber} 
											required/>
											<div className='invalid-tooltip'>Phone Number is required!</div>
									</div>
                </div>
                <div className='form-group'>
                  <label className='control-label text-form-right' for="Address" sm={12}>Address(Default)</label>
                  <div className='col'>
						      	<input 
										className='form-control addr' 
										name="address" 
										type="textarea" 
										id="Address" 
										onChange={this.onChangeAddress} 
										value={this.state.address}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
					<br/>
					<button width='auto' type='submit' className='btn button-confirm' onValidSubmit={this.handleValidSubmit}> COMFIRM </button>
          </form>
        </div>
      </div>
    
    );
  }
}

export default Register;