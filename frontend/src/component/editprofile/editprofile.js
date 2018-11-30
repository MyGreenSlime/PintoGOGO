import React, { Component } from "react";
import "./editprofile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";
import classnames from "classnames";
import { getProfile } from "../api/api";
import ModalMap from "../modal-map/modalmap";
import axios from "axios";

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
      address: [],
      newAddr: [],
      isLoaded: false,
      setLoaded: false,
      alreadyLoaded: true,
      currentUser: null,
      amountAddr: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.deleteAddr = this.deleteAddr.bind(this);
    this.handleDataAddr = this.handleDataAddr.bind(this);
    this.createRenderAddr = this.createRenderAddr.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/");
    }
    const get_user = getProfile.bind(this, "currentUser", "isLoaded");
    get_user();
  }

  setUser() {
    console.log("set user");
    console.log(this.state.currentUser.address.length);
    this.setState({
      first_name: this.state.currentUser.first_name,
      last_name: this.state.currentUser.last_name,
      email: this.state.currentUser.email,
      phonenumber: this.state.currentUser.phonenumber,
      imagePreviewUrl: this.state.currentUser.img_url,
      checkimg: this.state.currentUser.img_url,
      setLoaded: true,
      alreadyLoaded: false,
      amountAddr: this.state.currentUser.address.length,
      address: this.state.currentUser.address
    });
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
      this.setState({
        errors: nextProps.errors
      });
      console.log("will recieve", nextProps);
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
    console.log("formData", formData);
    this.props.editProfile(formData, this.props.history);
    e.preventDefault();
  }

  deleteAddr(id) {
    console.log("button delete click!");
    axios.delete("/api/users/del/address/" + id).then(res => {
      console.log("delete addr success");
    });
  }

  handleDataAddr(addr, lat, lng, dist) {
    this.setState(
      {
        amountAddr: this.state.amountAddr + 1,
      },
      () => {
        console.log("length addr: ", this.state.amountAddr);
        const new_addr = {
          address: addr,
          lat: lat,
          lng: lng,
          distance: dist
        };
        this.state.newAddr.push(new_addr);
        this.forceUpdate();
      }
    );
    console.log("address from handle: ", addr);
    console.log("lat from handle: ", lat);
    console.log("lng from handle: ", lng);
    console.log("dist from handle: ", dist);
  }

  createRenderAddr(addr) {
    if(this.state[addr] <= 0) {
      return;
    }
    else {
      console.log("from create render", this.state[addr])
    const list_addr = this.state[addr].map((item, index) => (
      <li className="edit-list__addr">
        {item.address}
        <button
          type="button"
          className="btn btn-delete"
          onClick={this.deleteAddr.bind(
            this,
            this.state.currentUser.address[index]._id
          )}
        >
          <i class="fa fa-close" />
        </button>
      </li>
    ));

    return list_addr;
      }
  }

  render() {
    if (this.state.isLoaded && this.state.alreadyLoaded) {
      this.setUser();
    }
    if (!!!this.state.setLoaded) {
      return <div className="loader" />;
    }
    const { errors } = this.state;
    const { currentUser } = this.state;
    console.log("current user!!", currentUser);
    return (
      <div className="set-screen">
        {" "}
        {/*bg*/}
        <div className="editprofile-box">
          <form noValidate onSubmit={this.handleSubmit}>
            <h2> PROFILE </h2>
            <div className="center">
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
                  <div className="invalid-feedback">{errors.phonenumber}</div>
                )}
              </div>
            </div>
            <div className=" row">
              <div className="col-sm-6">
                <label htmlFor="PhoneNumber">Address:</label>
              </div>
              <div className="col">
                <div className="edit-address-area">
                  <ul>
                    {this.createRenderAddr("address")}
                    {this.createRenderAddr("newAddr")}
                  </ul>
                </div>
                <ModalMap
                  handleFromEditProfile={this.handleDataAddr}
                  addrAmount={this.state.amountAddr}
                />
              </div>
            </div>
            <br />
            <button
              width="auto"
              type="submit"
              className="btn button-confirm"
              onClick={this.updateAddress}
            >
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
