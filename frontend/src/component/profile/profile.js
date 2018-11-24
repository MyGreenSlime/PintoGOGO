import React, { Component } from "react";
import "./profile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      return this.props.history.push("/");
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/");
    }

    axios.get("/api/users/profile").then(res => {
      this.setState(
        {
          currentUser: res.data,
          isLoaded: true
        },
        () => {
          console.log("test ", this.state.currentUser);
        }
      );
    });
  }

  render() {
    if (!!!this.state.isLoaded) {
      return <React.Fragment />;
    }
    {
      console.log("....", this.state.currentUser);
    }
    const { currentUser } = this.state;
    return (
      <div className="set-screen">
        {" "}
        {/*bg*/}
        <div className="profile-box">
          <h2> PROFILE </h2>
          <img className="userpic" src={currentUser.img_url} />
          {/* <br /> */}
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Firstname">Firstname:</label>
            </div>
            <div className="col-sm">{currentUser.first_name}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Lastname">Lastname:</label>
            </div>
            <div className="col-sm">{currentUser.last_name}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Username">Username:</label>
            </div>
            <div className="col-sm">{currentUser.user_name}</div>
          </div>
          <div className="addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Email">E-mail:</label>
            </div>
            <div className="col">{currentUser.email}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="PhoneNumber">Phone Number: </label>
            </div>
            <div className="col">{currentUser.phonenumber}</div>
          </div>
          <div className=" row">
            <div className="col-sm-6">
              <label htmlFor="PhoneNumber">Address: </label>
            </div>
            <div className="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle addr-dropdown"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Address
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">
                    {currentUser.address[0].address}
                  </a>
                  <a class="dropdown-item" href="#">
                    Address 2
                  </a>
                  <a class="dropdown-item" href="#">
                    Add Address
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <a href="/editprofile">
            <button width="auto" type="submit" className="btn button-confirm">
              {" "}
              EDIT PROFILE{" "}
            </button>
          </a>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Profile));
