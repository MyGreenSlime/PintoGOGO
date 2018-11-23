import React, { Component } from 'react';
import './package.css';
import axios from "axios";
import NoPackage from './nopackage';
import LinkWithPrev from '../LinkWithPrev/linkwithprev.js'
import { getPackage } from '../api/api';

export default class Savepack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false,
    }
    this.createDivPackage = this.createDivPackage.bind(this);
  }

  componentDidMount() {
    const get_package = getPackage.bind(this, "packages", "isLoaded", "system/"+this.props.path);
    get_package()
  }

  createDivPackage(curPack) {
    let divpk =
      <React.Fragment>
        <div className="set-each-package row">
          <div className="col-sm-4">
            <img className="img-pack" src={curPack.day_meal[0].meal_1.img_url} />
          </div>
          <div className="col-sm dis-grid">
            <div>
              <p className="name-each-pks">{curPack.name_package}</p>
              <p>{curPack.description}</p>
            </div>
            <LinkWithPrev to={"/" + this.props.path + "/" + curPack._id}>
              <button className="btn view-pks">View Package</button>
            </LinkWithPrev>
          </div>
        </div>
      </React.Fragment>
    return divpk;
  }

    render() {

        if (!this.state.isLoaded) {
            return <div className="loader" />;
        }
        if (!this.state.packages.data[0]) {
            return <NoPackage />
        }

        const listPackages = this.state.packages.data.map((pk, index) =>
            <div key={index}>
                {this.createDivPackage(pk)}
            </div>
        );
        console.log(typeof this.state.packages.data)

        return (
            <React.Fragment>
                {listPackages}
            </React.Fragment>
        );
    }
}
