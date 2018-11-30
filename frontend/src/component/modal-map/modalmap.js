import React, { Component } from "react";
import "./style-modalmap.css";
import GoogleMap from "../googlemap/ggmap";

export default class ModalMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      address: {
        address: "",
        lat: "",
        lng: "",
        distance: null
      }
    };
    this.handleData = this.handleData.bind(this);
    this.handleSaveAddr = this.handleSaveAddr.bind(this);
  }

  handleData(lat, lng, dest, dist) {
    this.setState(
      {
        address: {
          address: dest[0],
          lat: lat,
          lng: lng,
          distance: dist
        }
      },
      () => {
      }
    );
  }

  handleSaveAddr() {
    this.props.handleFromEditProfile(
      this.state.address.address,
      this.state.address.lat,
      this.state.address.lng,
      this.state.address.distance
    );
  }

  checkAmountAddr() {
    if (this.props.amountAddress >= 3) {
      return (
        <button
          type="button"
          className="btn button--save"
          data-toggle="modal"
          data-target="#modalMap"
          disabled
        >
          Add Address
        </button>
      );
    }
    return (
      <button
        type="button"
        className="btn button--save"
        data-toggle="modal"
        data-target="#modalMap"
      >
        Add Address
      </button>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {this.checkAmountAddr()}
          <div
            className="modal fade"
            id="modalMap"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modalMapTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <GoogleMap handleFromParent={this.handleData} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning button--save"
                    data-dismiss="modal"
                    onClick={this.handleSaveAddr}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
