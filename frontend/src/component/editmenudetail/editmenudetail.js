import React, { Component } from "react";
import axios from "axios";
import "../editmenudetail/editmenudetail.css";
import { getFoodOrSnack, editFoodOrSnack } from "../api/api";

class EditMenuDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
      food: {},
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
    var url = window.location.href;
    var res = url.split("/");
    const getFood = getFoodOrSnack.bind(
      this,
      "food",
      "isLoaded",
      "food/" + res[res.length - 1]
    );
    getFood();
    this.setState({
      id: res[res.length - 1]
    });
  }

  setFood() {
    this.setState({
      menu_name: this.state.food.menu_name,
      price: this.state.food.price,
      calories: this.state.food.calories,
      protein: this.state.food.protein,
      carbohydrate: this.state.food.carbohydrate,
      fat: this.state.food.fat,
      img_url: "",
      description: this.state.food.description,
      sodium: this.state.food.sodium,
      cholesterol: this.state.food.cholesterol,
      imagePreviewUrl: "\\" + this.state.food.img_url,
      alreadyLoaded: true
    });
  }

  renderRedirect() {
    return (window.location.href = "/menudetail/" + this.state.id);
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
    formData.append("img_url", this.state.food.img_url);
    formData.append("menu_name", this.state.menu_name);
    formData.append("calories", this.state.calories);
    formData.append("price", this.state.price);
    formData.append("protein", this.state.protein);
    formData.append("carbohydrate", this.state.carbohydrate);
    formData.append("fat", this.state.fat);
    formData.append("cholesterol", this.state.cholesterol);
    formData.append("sodium", this.state.sodium);
    formData.append("description", this.state.description);
    const editSubmit = editFoodOrSnack.bind(this, "food", this.state.id, formData)
    editSubmit();
    e.preventDefault();
  }

  render() {
    if (this.state.isLoaded && !this.state.alreadyLoaded) {
      this.setFood();
    }
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} className="editmenudetail__imgpreview" />
      );
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
                  name="menu_name"
                  className="form-control menudetail__menuname--right"
                  placeholder={this.state.food.menu_name}
                  value={this.state.menu_name}
                  onChange={this.handleChange}
                  style={{ width: "40%" }}
                  required
                />
              </div>
            </div>
            <div className="line" />

            <div className="row menudetail__detail">
              <div className="col-5">
                <img
                  src={imagePreviewUrl}
                  className="editmenudetail__imgpreview"
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
                    placeholder={this.state.food.description}
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
                    placeholder={this.state.food.calories + " Kcal"}
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
                    placeholder={this.state.food.fat + " mg"}
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
                    placeholder={this.state.food.cholesterol + " g"}
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
                    placeholder={this.state.food.sodium + " mg"}
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
                    placeholder={this.state.food.carbohydrate + " g"}
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
                    placeholder={this.state.food.protein + " g"}
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
                    placeholder={this.state.food.price + " ฿"}
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
