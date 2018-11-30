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
        console.log("address from modal", this.state.address);
        // console.log("modal destination: ", this.state.address.address);
        // console.log("modal lat: ", this.state.address.lat);
        // console.log("modal lng: ", this.state.address.lng);
        // console.log("modal distance: ", this.state.address.distance);
      }
    );
  }

  handleSaveAddr() {
    // console.log("address from modal". this.state.address)
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
          class="btn button--save"
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
        class="btn button--save"
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
          {/* <button
            type="button"
            class="btn button--save"
            data-toggle="modal"
            data-target="#modalMap"
          >
            Add Address
          </button> */}

          <div
            class="modal fade"
            id="modalMap"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalMapTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <GoogleMap handleFromParent={this.handleData} />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-warning button--save"
                    data-dismiss="modal"
                    onClick={this.handleSaveAddr}
                  >
                    Save changes
                  </button>
                  <p>{this.props.amountAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
