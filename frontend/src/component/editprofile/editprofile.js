import React, { Component } from "react";
import "./editprofile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";
import classnames from "classnames";
import { getProfile, deleteAddress, addAddress } from "../api/api";
import ModalMap from "../modal-map/modalmap";

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
      oldAddr: [],
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
    this.createRenderAddr = this.createRenderAddr.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
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
      alreadyLoaded: false,
      amountAddr: this.state.currentUser.address.length,
      oldAddr: this.state.currentUser.address
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

  handleDataAddr(addr, lat, lng, dist) {
    this.setState(
      {
        amountAddr: this.state.amountAddr + 1
      },
      () => {
        console.log("length addr: ", this.state.amountAddr);
        const newaddr = {
          address: addr,
          lat: lat,
          lng: lng,
          distance: dist
        };
        this.state.newAddr.push(newaddr);
        this.forceUpdate();
      }
    );
    console.log("address from editProfile: ", addr);
    console.log("lat from editProfile: ", lat);
    console.log("lng from editProfile: ", lng);
    console.log("dist from editProfile: ", dist);
  }

  createRenderAddr(addr) {
    if (this.state[addr] <= 0) {
      return;
    } else {
      console.log("from create render", this.state[addr]);
      const listAddr = this.state[addr].map((item, index) => (
        <div className="row edit-list__addr">
          <div className="col-10 addr-list">{item.address}</div>
          <div className="col">
            <button
              type="button"
              className="btn"
              onClick={this.deleteAddr.bind(this, index, addr)}
            >
              <i className="fa fa-close" />
            </button>
          </div>
        </div>
      ));

      return listAddr;
    }
  }

  async updateAddress() {
    let len = Object.keys(this.state.newAddr).length;
    for (let i = 0; i < len; i++) {
      const newAddress = {
        address: {
          address: this.state.newAddr[i].address,
          lat: this.state.newAddr[i].lat,
          lng: this.state.newAddr[i].lng,
          distance: this.state.newAddr[i].distance
        }
      };
     
      const addAddr = addAddress.bind(this, newAddress);
      await addAddr();
    }
  }

  deleteAddr(index, type) {
    let typeOfListAdddr = "oldAddr";
    if (typeOfListAdddr == type) {
      console.log("this is old address no.: ", index);
      for (let i = 0; i < this.state.oldAddr.length; i++) {
        if (i == index) {
          let id = this.state.oldAddr[i]._id;
          const deleteAddr = deleteAddress.bind(this, id);
          deleteAddr();
          this.state.oldAddr.splice(i, 1);
          this.setState({
            amountAddr: this.state.amountAddr - 1
          });
        }
      }
      this.forceUpdate();
    } else {
      console.log("this is new address no.: ", index);
      for (let i = 0; i < this.state.newAddr.length; i++) {
        if (i == index) {
          this.state.newAddr.splice(i, 1);
          this.setState({
            amountAddr: this.state.amountAddr - 1
          });
        }
      }
      this.forceUpdate();
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
              <img className="userpic-edit" src={this.state.imagePreviewUrl} alt="profile picture"/>
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
              <div className="col-lg">
                <label htmlFor="PhoneNumber">Address</label>
              </div>
              <div className="edit-address-area">
                {this.createRenderAddr("oldAddr")}
                {this.createRenderAddr("newAddr")}
              </div>
              <ModalMap
                handleFromEditProfile={this.handleDataAddr}
                amountAddress={this.state.amountAddr}
              />
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
