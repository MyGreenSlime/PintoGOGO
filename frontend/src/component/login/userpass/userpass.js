import React, { Component } from "react";
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import classnames from 'classnames';

import {
    Col,
    Button,
    FormGroup,
    Input,
    FormText
} from "reactstrap";

class Userpass extends Component {
    constructor() {
        super();
            this.state = {
                user_name : "",
                password : "",
                errors : {}
            }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize, false);
        if(this.props.auth.isAuthenticated) {
            //this.props.history.push('/');
            window.location.href = '/';
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            //this.props.history.push('/') //go to page after login
            window.location.href = '/';
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        } 
    } 

    onResize(e) {
        console.log(`${e.target.innerWidth} ${e.target.innerHeight}`);
    }
    onChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      })
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            user_name: this.state.user_name,
            password : this.state.password
        }
        this.props.loginUser(userData)
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="form-group">
                <div className="login__text">LOGIN</div>
                    <AvForm onValidSubmit={this.onSubmit}>
                        <Col>
                            <AvGroup>
                                <AvInput 
                                    id="username" 
                                    name="user_name" 
                                    type="text" 
                                    placeholder="username" 
                                    className="login__text--box" 
                                    value = {this.state.user_name}
                                    onChange ={this.onChange}
                                required/>
                                <AvFeedback> username is required! </AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <AvInput 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    placeholder="password" 
                                    className="login__text--box" 
                                    value = {this.state.password}
                                    onChange = {this.onChange}
                                required/>
                                <AvFeedback> password is required! </AvFeedback>
                            </AvGroup>
                        </Col>
                        <Button type="submit" className="submit__login--button">
                            LOGIN
                        </Button>
                    </AvForm>
            </div>
        );
  }
}

Userpass.propTypes = {
  loginUser : propTypes.func.isRequired,
  auth : propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
});


export default connect(mapStateToProps, {loginUser})(Userpass);
