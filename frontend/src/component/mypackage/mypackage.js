import React, { Component } from "react";
import "./mypackage.css";
import NoPackage from "../package/nopackage";
import LinkWithPrev from "../LinkWithPrev/linkwithprev.js";
import { deleteFromDB, getPackage } from "../api/api";

export default class MyPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false
    };
    this.createDivPackage = this.createDivPackage.bind(this);
    this.deleteFromDb = this.deleteFromDb.bind(this);
  }

  deleteFromDb(curPack) {
    const deletePackage = deleteFromDB.bind(this, "package", curPack._id);
    deletePackage();
  }

  componentDidMount() {
    const getAllPackages = getPackage.bind(
      this,
      "packages",
      "isLoaded",
      "user/all"
    );
    getAllPackages();
  }

  createDivPackage(curPack) {
    var path = "/" + curPack.type + "days/";
    let divpk = (
      <React.Fragment>
        <div className="set-each-mypackage row">
          <div className="col-sm-4">
            <img
              className="img-mypack"
              src={curPack.day_meal[0].meal_1.img_url}
            />
          </div>
          <div className="col-sm">
            <div className="detail">
              <div className="name-each-mypks">{curPack.name_package}</div>
              <p>{curPack.type} day package</p>
            </div>
            <div className="row">
              <div className="col-sm">
                <LinkWithPrev to={path + curPack._id}>
                  <button className="btn view-mypks">View Package</button>
                </LinkWithPrev>
              </div>
              <div className="col-sm">
                <button
                  className="btn view-mypks"
                  onClick={() => this.deleteFromDb(curPack)}
                >
                  Delete Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    return divpk;
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className="loader" />;
    }
    if (!this.state.packages[0]) {
      return (
        <div className="set-screen-mypack">
          <div className="set-frame-mypks">
            <h3>My Package</h3>
            <div className="set-each-mypackage">
              You have no package.
              <br />
              <a href="/packagemanage">
                <img
                  src="img/package/add-pack.png"
                  className="addpack"
                  alt="add package"
                  width="100px"
                />
              </a>
              <br />
              <a href="/packagemanage">
                <button className="btn view-mypks">
                  Try create your own package
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    }

    const listPackages = this.state.packages.map((pk, index) => (
      <div key={index}>{this.createDivPackage(pk)}</div>
    ));
    console.log(typeof this.state.packages.data);

    return (
      <React.Fragment>
        <div className="set-screen-mypack">
          <div className="set-frame-mypks">
            <h3>My Package</h3>
            {listPackages}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
