import React, { Component } from "react";
import "./mypackage.css";
import LinkWithPrev from "../LinkWithPrev/linkwithprev.js";
import { deleteFromDB, getPackage } from "../api/api";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class MyPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false
    };
    this.createDivPackage = this.createDivPackage.bind(this);
    this.deleteFromDb = this.deleteFromDb.bind(this);
    this.onPackageDeleted = this.onPackageDeleted.bind(this);
  }

  deleteFromDb(curPack) {
    const deletePackage = deleteFromDB.bind(this, "packages", curPack._id);
    deletePackage();
    this.onPackageDeleted(curPack._id);
  }

  onPackageDeleted(index) {
    const newPackages = this.state.packages.slice();
    newPackages.splice(index, 1);
    this.setState({
      packages: newPackages
    });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    const getAllPackages = getPackage.bind(
      this,
      "packages",
      "isLoaded",
      "user/all"
    );
    getAllPackages();
  }

  createDivPackage(curPack) {
    let divpk = (
      <React.Fragment>
        <div className="set-each-mypackage row">
          <div className="col-sm-4">
            <img
              className="img-mypack"
              src={curPack.day_meal[0].meal_1.img_url}
              alt={curPack.day_meal[0].meal_1.menu_name}
            />
          </div>
          <div className="col-sm">
            <div className="detail">
              <div className="name-each-mypks">{curPack.name_package}</div>
              <p>{curPack.type} day package</p>
            </div>
            <div className="row">
              <div className="col-sm">
                <LinkWithPrev to={"/detail/package/" + curPack._id}>
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
              <a href="/package/manage">
                <img
                  src="img/package/add-pack.png"
                  className="addpack"
                  alt="add package"
                  width="100px"
                />
              </a>
              <br />
              <a href="/package/manage">
                <button className="btn create-mypks">
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
MyPackage.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(MyPackage));
