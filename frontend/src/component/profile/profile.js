import React, {Component} from 'react';
import './profile.css';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'
import axios from 'axios';

class Register extends Component {
	constructor(props){
		super(props);
    this.state = {
			currentUser: {}
		}
  }
    
  componentDidMount() {
    axios.get('/api/users/profile')
    .then(res => {
      this.setState({  
        currentUser: res.data
      });
    })
    .then(() => {
      console.log("this", this.state.currentUser)
    });
  }
      
    render() {
      {console.log("....",this.state.currentUser)}
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
										{/* {this.currentUser.firstname} */}
		    	        </div> 
                </div>
                <div className='form-group row'>
					        <label className='control-label text-form-left' htmlFor="Lastname" >Lastname*</label>
    	  	        <div className='col'>
									
                  </div>
					      </div>
                <div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="Username" >Username*</label>
      	  	      <div className='col'>
							     
                   </div>
					      </div>
								<div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="Password">Password*</label>
      	  	      <div className='col'>
							    
                  </div>
			      		</div> 
					      <div className='form-group row'>
						      <label className='control-label text-form-left' htmlFor="ConfirmPassword">Confirm Password*</label>
      	  	      <div className='col'>
							    
                  </div>
			      		</div> 
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className='form-right'> {/*right form*/}
								<div className='form-group row'>
			      			<label className='control-label text-form-left' htmlFor="Email">E-mail*</label>
            	  	<div className='col'>
			      			
                  </div>
      					</div>
                <div className='form-group row'>
                  <label className='control-label text-form-left' htmlFor="PhoneNumber">Phone Number* &nbsp;&nbsp;</label>
						      <div className='col'>
                  
                  </div>
                </div>
                <div className='form-group'>
                  <label className='control-label text-form-right' htmlFor="Address" sm={12}>Address(Default)</label>
                  <div className='col'>
										
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
