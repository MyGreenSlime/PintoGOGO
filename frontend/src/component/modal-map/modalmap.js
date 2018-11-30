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
        // console.log("modal destination: ", this.state.address.address);
        // console.log("modal lat: ", this.state.address.lat);
        // console.log("modal lng: ", this.state.address.lng);
        // console.log("modal distance: ", this.state.address.distance);
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

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <button
            type="button"
            class="btn btn-warning"
            data-toggle="modal"
            data-target="#modalMap"
          >
            Add Address
          </button>

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
                    class="btn btn-warning"
                    data-dismiss="modal"
                    onClick={this.handleSaveAddr}
                  >
                    Save changes
                  </button>
                  <p>{this.props.addrAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
