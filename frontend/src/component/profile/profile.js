import React, { Component } from "react";
import "./profile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { getProfile } from "../api/api";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null
    };

    this.dropdownDOM = React.createRef();
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

    const get_user = getProfile.bind(this, "currentUser", "isLoaded");
    get_user();
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      const $ = window.$;
      this.dropdownDOM = $(this.dropdownDOM.current);
      this.dropdownDOM.dropdown();

      $(".dd__profile-addr").click(function() {
        var txt = $(this).text();
        console.log("dd selected", txt);
      });
      console.log(this.dropdownDOM);
    }
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
                  ref={this.dropdownDOM}
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
                  <a class="dropdown-item dd__profile-addr">
                    {currentUser.address[0].address}
                  </a>
                  <a class="dropdown-item">Address 2</a>
                  <a class="dropdown-item">Add Address</a>
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
