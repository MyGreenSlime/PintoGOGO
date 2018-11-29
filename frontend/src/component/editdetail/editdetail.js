import React, { Component } from "react";
import "./editdetail.css";
import { getFoodOrSnack, editFoodOrSnack } from "../api/api";

class EditMenuDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      menu: {},
      menu_name: "",
      price: "",
      calories: "",
      protein: "",
      carbohydrate: "",
      fat: "",
      img_url: "",
      description: "",
      sodium: "",
      cholesterol: "",
      status: 0,
      file: "",
      imagePreviewUrl: "",
      alreadyLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props) 
    var url = window.location.href;
    var res = url.split("/");
    const getMenu = getFoodOrSnack.bind(
      this,
      "menu",
      "isLoaded",
      this.props.type + "/" + res[res.length - 1]
    );
    getMenu();
    this.setState({
      id: res[res.length - 1]
    });
  }

  setMenu() {
    this.setState({
      name: this.state.menu[this.props.name],
      price: this.state.menu.price,
      calories: this.state.menu.calories,
      protein: this.state.menu.protein,
      carbohydrate: this.state.menu.carbohydrate,
      fat: this.state.menu.fat,
      img_url: "",
      description: this.state.menu.description,
      sodium: this.state.menu.sodium,
      cholesterol: this.state.menu.cholesterol,
      imagePreviewUrl: "\\" + this.state.menu.img_url,
      alreadyLoaded: true
    });
  }

  renderRedirect() {
    return (window.location.href = this.props.redirect + this.state.id);
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
          img_url: file,
          imagePreviewUrl: reader.result
        },
        () => {
          console.log("pic", this.state.profilepic);
        }
      );
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    const formData = new FormData();
    formData.append("img", this.state.img_url, this.state.img_url.name);
    formData.append("img_url", this.state.menu.img_url);
    formData.append(this.props.name, this.state.name);
    formData.append("calories", this.state.calories);
    formData.append("price", this.state.price);
    formData.append("protein", this.state.protein);
    formData.append("carbohydrate", this.state.carbohydrate);
    formData.append("fat", this.state.fat);
    formData.append("cholesterol", this.state.cholesterol);
    formData.append("sodium", this.state.sodium);
    formData.append("description", this.state.description);
    const editSubmit = editFoodOrSnack.bind(
      this,
      this.props.type,
      this.state.id,
      formData
    );
    editSubmit();
    e.preventDefault();
  }

  render() {
    if (this.state.isLoaded && !this.state.alreadyLoaded) {
      this.setMenu();
    }
    return (
      <React.Fragment>
        <div className="all">
          <div className="row menudetail__outside">
            <div className="col-3 menudetail__homebutton">
              <img
                src="/img/other/left-arrow.png"
                alt="left arrow icon"
                height="20px"
              />
              <a href="/">BACK TO HOMEPAGE</a>
            </div>
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="col menudetail__menuname">
                <input
                  type="text"
                  name="name"
                  className="form-control menudetail__menuname--right"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  style={{ width: "30%" }}
                  required
                />
              </div>
            </div>
            <div className="line" />

            <div className="row menudetail__detail">
              <div className="col-5">
                <img
                  src={this.state.imagePreviewUrl}
                  className="editmenudetail__imgpreview"
                  alt="preview"
                />
                <br />
                <div className="upload-btn-wrapper">
                  <button className="btn-upload">Change Picture</button>
                  <input
                    type="file"
                    name="profilepic"
                    onChange={this.handleChangeImage}
                  />
                </div>
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    value="submit"
                    className="menudetail__detail--addtocartbutton"
                  >
                    SAVE CHANGE
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="row menudetail_detail_description">
                  <textarea
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-9 cal">
                    <p>CALORIES</p>
                  </div>
                  <input
                    type="text"
                    name="calories"
                    className="form-control"
                    placeholder="calories g"
                    value={this.state.calories}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row line" />
                <div className="row">
                  <div className="col-9">
                    <p>FAT</p>
                  </div>
                  <input
                    type="text"
                    name="fat"
                    className="form-control"
                    placeholder="fat g"
                    value={this.state.fat}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row">
                  <div className="col-9">
                    <p>CHOLESTEROL</p>
                  </div>
                  <input
                    type="text"
                    name="cholesterol"
                    className="form-control"
                    placeholder="cholesterol mg"
                    value={this.state.cholesterol}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row">
                  <div className="col-9">
                    <p>SODIUM</p>
                  </div>
                  <input
                    type="text"
                    name="sodium"
                    className="form-control"
                    placeholder="sodium mg"
                    value={this.state.sodium}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row">
                  <div className="col-9">
                    <p>CARBOHYDRATE</p>
                  </div>
                  <input
                    type="text"
                    name="carbohydrate"
                    className="form-control"
                    placeholder="carbohydrate g"
                    value={this.state.carbohydrate}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row ">
                  <div className="col-9">
                    <p>PROTEIN</p>
                  </div>
                  <input
                    type="text"
                    name="protein"
                    className="form-control"
                    placeholder="protei gn"
                    value={this.state.protein}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
                <div className="row">
                  <div className="col-9">
                    <p>PRICE</p>
                  </div>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="price THB"
                    value={this.state.price}
                    onChange={this.handleChange}
                    style={{ width: "20%" }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditMenuDetail;
