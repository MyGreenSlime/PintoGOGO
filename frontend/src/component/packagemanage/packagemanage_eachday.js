import React, { Component } from "react";
import "./packagemanage.css";
import { DropTarget } from "react-drag-drop-container";
import NutritionManage from "./nutritionmanage";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { addOrSavePackageToCart } from "../api/api";

class PackagemanageEachdays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_img: [],
      day_detail: [],
      sum_price: 0,
      is_ready_to_show: [],
      click_show: false,
      name_package: "",
      description: "",
      package_id: "",
      save: false,
      path: ""
    };
    const init_day = this.initDayImg.bind(this, this.props.num_day, "day_img");
    const init_ready = this.initReady.bind(
      this,
      this.props.num_day,
      "is_ready_to_show"
    );
    const init_detail = this.initDetail.bind(
      this,
      this.props.num_day,
      "day_detail"
    );
    init_day();
    init_ready();
    init_detail();
    console.log("img_day", this.state.day_img);
    console.log("img_detail", this.state.day_detail);
    console.log("ready", this.state.ready);
    this.send3DaysPackage = this.sendPackage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setPath = this.setPath.bind(this);
  }

  initDayImg(num_day, day_img) {
    const start_img = [
      <img className="card-img" src="../img/package/blank.PNG" alt="blank" />,
      <img className="card-img" src="../img/package/blank.PNG" alt="blank" />
    ];
    for (let i = 0; i < num_day; i++) {
      this.state[day_img].push(start_img);
    }
  }

  initReady(num_day, ready) {
    const start_ready = [false, false];
    for (let i = 0; i < num_day; i++) {
      this.state[ready].push(start_ready);
    }
  }

  initDetail(num_day, day_detail) {
    const start_detail = [null, null];
    for (let i = 0; i < num_day; i++) {
      this.state[day_detail].push(start_detail);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendPackage(path) {
    /** cal price */
    let price = 0;
    for (let i = 0; i < this.props.num_day; i++) {
      price +=
        this.state.day_detail[i][0]["price"] +
        this.state.day_detail[i][1]["price"];
    }
    /** create daymeal */
    let day_meal = [];
    for (let i = 0; i < this.props.num_day; i++) {
      const meal1_2 = {
        meal_1: this.state.day_detail[i][0],
        meal_2: this.state.day_detail[i][1]
      };
      day_meal.push(meal1_2);
    }
    console.log(path + " package");
    if (this.state.save && path === "add") {
      alert("your package is already save!");
    }

    /** json */
    const newPackage = {
      package_id: this.state.package_id,
      name_package: this.state.name_package,
      description: this.state.description,
      type: this.props.num_day,
      day_meal: day_meal,
      price: price
    };
    const send_pack = addOrSavePackageToCart.bind(
      this,
      newPackage,
      path,
      "save",
      "package_id"
    );
    send_pack();
  }

  checkReady() {
    let all_ready = true;
    for (let i = 0; i < this.props.num_day; i++) {
      for (let j = 0; j < 2; j++) {
        if (!this.state.is_ready_to_show[i][j]) {
          all_ready = false;
        }
      }
    }
    console.log("ready", all_ready);
    if (all_ready) {
      return (
        <button
          className="btn btn-shownutrition"
          onClick={() => this.setState({ click_show: true })}
        >
          {" "}
          CLICK TO SHOW NUTRITION{" "}
        </button>
      );
    }
    return (
      <button className="btn btn-shownutrition" disabled>
        {" "}
        CLICK TO SHOW NUTRITION{" "}
      </button>
    );
  }

  setMenuDrop(dayimg, daydetail, ready, day, meal, e) {
    /* Copy Multi dimension array by Check */
    let newDayMealState = [];
    let newDayDetailState = [];
    let newReady = [];
    for (let i = 0; i < this.props.num_day; i++) {
      newDayMealState.push([
        this.state[dayimg][i][0],
        this.state[dayimg][i][1]
      ]);
      newDayDetailState.push([
        this.state[daydetail][i][0],
        this.state[daydetail][i][1]
      ]);
      newReady.push([this.state[ready][i][0], this.state[ready][i][1]]);
    }
    console.log("img", e.dragData.img_url);

    newDayMealState[day][meal] = (
      <div className="hovereffect">
        <img
          className="card-img"
          src={e.dragData.img_url}
          alt={e.dragData.menu_name}
        />
        <div className="overlay">
          <h2>{e.dragData.menu_name}</h2>
        </div>
      </div>
    );
    newDayDetailState[day][meal] = e.dragData;
    newReady[day][meal] = true;

    this.setState({
      [dayimg]: newDayMealState,
      [daydetail]: newDayDetailState,
      [ready]: newReady
    });
    console.log("img ", this.state.day_img);
    console.log("detail", this.state.day_detail);
    console.log("ready ", this.state.is_ready_to_show);
  }

  createDropTarget(day, meal) {
    return (
      <DropTarget
        targetKey="menu"
        onHit={this.setMenuDrop.bind(
          this,
          "day_img",
          "day_detail",
          "is_ready_to_show",
          day,
          meal
        )}
      >
        {this.state.day_img[day][meal]}
      </DropTarget>
    );
  }

  createRowDay(day) {
    return (
      <div className="row">
        <div className="col card-pack-img">{this.createDropTarget(day, 0)}</div>
        <div className="col card-pack-img">{this.createDropTarget(day, 1)}</div>
      </div>
    );
  }

  setPath(path) {
    this.setState({
      path: path
    });
  }

  handleSubmit(e) {
    const form = e.target;
    // console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      this.sendPackage(this.state.path);
    }
    form.classList.add("was-validated");
    console.log("test: ", form);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const users = <div />;
    const admin = (
      <div className="row">
        <label className="col-sm-4">Description:</label>
        <div className="col-sm-6">
          <textarea
            className="form-control"
            placeholder="description"
            type="text"
            name="description"
            id="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </div>
      </div>
    );

    let list_day = [];

    for (let i = 0; i < this.props.num_day; i += 2) {
      if (this.props.num_day % 2 === 1 && i === this.props.num_day - 1) {
        list_day[i] = (
          <div className="row">
            <div className="col-3-sm col-set" />
            <div className="col-sm card-last-package ">
              {"DAY " + (i + 1)}
              {this.createRowDay(i)}
            </div>
            <div className="col-3-sm col-set" />
          </div>
        );
      } else {
        list_day[i] = (
          <div className="row">
            <div className="col-sm card-package">
              {"DAY " + (i + 1)}
              {this.createRowDay(i)}
            </div>
            <div className="col-sm card-package">
              {"DAY " + (i + 2)}
              {this.createRowDay(i + 1)}
            </div>
          </div>
        );
      }
    }

    const login = (
      <div>
        <button
          className="btn btn-shownutrition"
          onClick={() => (window.location.href = "/login")}
        >
          LOGIN
        </button>
      </div>
    );
    const addAndSave = (
      <div>
        <button
          className="btn btn-shownutrition"
          onClick={() => this.setPath("addcart")}
        >
          ADD TO CART
        </button>
        <button
          className="btn btn-shownutrition" // onClick={this.testClick()}
          onClick={() => this.setPath("add")}
        >
          SAVE PACKAGE
        </button>
      </div>
    );
    return (
      <React.Fragment>
        <div className="packagemanage-box ">
          {list_day}

          {/**------------------------------------------------------------- */}
          {this.checkReady()}

          {this.state.click_show && (
            <React.Fragment>
              <form
                className="needs-validation"
                noValidate
                onSubmit={this.handleSubmit.bind(this)}
              >
                <div>
                  <div className="row">
                    <label className="col-sm-4">Package name:</label>
                    <div className="col-sm-6">
                      <input
                        className="form-control"
                        placeholder="Please name your package before save"
                        type="text"
                        name="name_package"
                        id="name_package"
                        onChange={this.handleChange}
                        value={this.state.name_package}
                        required
                      />
                      <div className="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>
                  <br />
                  <div>
                    {isAuthenticated ? users : ""}
                    {user.type ? admin : ""}
                  </div>
                </div>
                <div>
                  <NutritionManage
                    menu_detail={this.state.day_detail}
                    day={this.props.num_day}
                  />
                </div>
                {isAuthenticated ? addAndSave : login}
              </form>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

PackagemanageEachdays.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PackagemanageEachdays);
