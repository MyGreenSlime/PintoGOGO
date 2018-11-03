import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";
import {withRouter} from 'react-router-dom'

class Userpass extends Component {
  constructor() {
    super();
    this.state = {
      user_name: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
      //window.location.href = "/";
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/') //go to page after login
      //window.location.href = "/";
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onResize(e) {
    console.log(`${e.target.innerWidth} ${e.target.innerHeight}`);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      user_name: this.state.user_name,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="login__text">LOGIN</div>
        <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group col">
              <input
                className= {classnames("form-control login__texx--box",{
                  'is-invalid' : errors.user_name
                })}
                id="username"
                name="user_name"
                type="text"
                placeholder="username"
                value={this.state.user_name}
                onChange={this.onChange}
              />
              {errors.user_name && (<div className="invalid-feedback">{errors.user_name}</div>)}
            </div>
            <div className="form-group col">
              <input
                className= {classnames("form-control login__texx--box",{
                  'is-invalid' : errors.password
                })}
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            {/*BUTTON*/}
            <div>
              <button type="submit" className="submit__login--button">
                LOGIN
              </button>
            </div>
        </form>
      </React.Fragment>
    );
  }
}

Userpass.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ loginUser })(withRouter(Userpass));
