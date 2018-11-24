import React, { Component } from "react";
import "./editprofile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";
import classnames from "classnames";
import { getProfile } from "../api/api";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phonenumber: "",
      profilepic: null,
      imagePreviewUrl: null,
      checkimg: null,
      errors: {},
      lat: [],
      lng: [],
      dest: [],
      dist: [],
      isLoaded: false,
      setLoaded: false,
      alreadyLoaded: true,
      currentUser: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.setUser = this.setUser.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/");
    }
    const get_user = getProfile.bind(this, "currentUser", "isLoaded");
    get_user();
  }

  setUser() {
    this.setState({
      first_name: this.state.currentUser.first_name,
      last_name: this.state.currentUser.last_name,
      email: this.state.currentUser.email,
      phonenumber: this.state.currentUser.phonenumber,
      imagePreviewUrl: this.state.currentUser.img_url,
      checkimg: this.state.currentUser.img_url,
      setLoaded: true,
      alreadyLoaded: false
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeImage(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState(
        {
          profilepic: file,
          imagePreviewUrl: reader.result
        },
        () => {
          console.log("pic", this.state.profilepic);
        }
      );
    };
    reader.readAsDataURL(file);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log("will recieve", nextProps)
    }
  }

  handleSubmit(e) {
    const formData = new FormData();
    if (this.state.imagePreviewUrl != this.state.checkimg) {
      formData.append("img", this.state.profilepic, this.state.profilepic.name);
    } else {
      formData.append("img_url", this.state.imagePreviewUrl);
    }
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("email", this.state.email);
    formData.append("phonenumber", this.state.phonenumber);
    console.log(formData);
    this.props.editProfile(formData, this.props.history);
    e.preventDefault();
  }

  render() {
    if (this.state.isLoaded && this.state.alreadyLoaded){
      this.setUser()
    }
    if (!!!this.state.setLoaded) {
      return <div className="loader" />;
    }
    const { errors } = this.state;
    const { currentUser } = this.state;
    return (
      <div className="set-screen">
        {" "}
        {/*bg*/}
        <div className="editprofile-box">
          <form noValidate onSubmit={this.handleSubmit}>
            <h2> PROFILE </h2>
            <div className="profilepic-edit center">
              <img className="userpic-edit" src={this.state.imagePreviewUrl} />
              <br />
              <div className="upload-btn-wrapper">
                <button className="btn-upload">Change Picture</button>
                <input
                  type="file"
                  name="profilepic"
                  onChange={this.handleChangeImage}
                />
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label htmlFor="Firstname">Firstname:</label>
              </div>
              <div className="col-sm">
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.first_name
                  })}
                  name="first_name"
                  type="text"
                  id="Firstname"
                  placeholder="Firstname"
                  onChange={this.handleChange}
                  value={this.state.first_name}
                />
                {errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label htmlFor="Lastname">Lastname:</label>
              </div>
              <div className="col-sm">
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.last_name
                  })}
                  type="text"
                  name="last_name"
                  id="Lastname"
                  placeholder="Lastname"
                  onChange={this.handleChange}
                  value={this.state.last_name}
                />
                {errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label htmlFor="Username">Username:</label>
              </div>
              <div className="col-sm">{currentUser.user_name}</div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label htmlFor="Email">E-mail:</label>
              </div>
              <div className="col">
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  id="Email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label htmlFor="PhoneNumber">Phone Number:</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.phonenumber
                  })}
                  name="phonenumber"
                  id="PhoneNumber"
                  placeholder="Phone number"
                  onChange={this.handleChange}
                  value={this.state.phonenumber}
                />
                {errors.phonenumber && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>
            <div className=" row">
              <div className="col-sm-6">
                <label htmlFor="PhoneNumber">Address:</label>
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
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
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
            <button width="auto" type="submit" className="btn button-confirm">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  editProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProfile }
)(withRouter(EditProfile));
