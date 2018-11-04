import React, { Component } from "react";
import "./style-ggmap.css";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.divMap = React.createRef();
    this.divSearchBox = React.createRef();
    this.interval = setInterval(() => this.handleSubmit(), 1000);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      lat: [],
      lng: [],
      dest: [],
      dist: []
    };
  }

  componentDidMount() {
    window.lat = 13.736717;
    window.lng = 100.523186;
    window.initMap = this.initMap.bind(this);
    // window.handleSubmit = this.handleSubmit.bind(this);

    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKOfI6E4o_jRc1K8qBb63RsUKwZAavGSs&libraries=places&callback=initMap"
    );
  }

  initMap(position) {
    // console.log(this.divMap.current);

    // CREATE MAP
    window.myGMap = new window.google.maps.Map(this.divMap.current, {
      center: { lat: 13.736717, lng: 100.523186 },
      zoom: 13
    });

    // console.log(window.myGMap);

    // CREATE AUTO-COMPLETE
    window.input = this.divSearchBox.current;
    window.autocomplete = new window.google.maps.places.Autocomplete(
      window.input
    );
    window.autocomplete.bindTo("bounds", window.myGMap);

    // CREATE MARKER
    window.marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(window.lat, window.lng),
      map: window.myGMap,
      label: {
        text: "pick up here",
        color: "white",
        fontSize: "9px"
      },
      draggable: true
    });

    // WHEN PLACE CHANGED
    window.autocomplete.addListener("place_changed", function() {
      window.onChangeAutoComp = true;
      var place = window.autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        window.myGMap.fitBounds(place.geometry.viewport);
      } else {
        window.myGMap.setCenter(place.geometry.location);
        window.myGMap.setZoom(17);
      }
      // console.log("place change");
      window.lat = window.autocomplete.getPlace().geometry.location.lat();
      window.lng = window.autocomplete.getPlace().geometry.location.lng();

      window.latlng = new window.google.maps.LatLng(window.lat, window.lng);
      window.marker.setPosition(window.latlng);
    });

    // WHEN DRAGEND MARKER
    window.marker.addListener("dragend", function() {
      window.lat = window.marker.getPosition().lat();
      window.lng = window.marker.getPosition().lng();
      // window.handleSubmit();
    });
  }

  handleSubmit() {
    this.props.handleFromParent(
      window.lat,
      window.lng,
      window.destAddr,
      window.distance
    );
  }

  getDistance() {
    window.origin = { lat: 13.845955, lng: 100.568674 };
    window.dest = { lat: window.lat, lng: window.lng };

    window.service = new window.google.maps.DistanceMatrixService();
    window.service.getDistanceMatrix(
      {
        origins: [window.origin],
        destinations: [window.dest],
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status !== "OK") {
          alert("Error was: " + status);
        } else {
          window.destAddr = response.destinationAddresses;
          window.distance = response.rows[0].elements[0].distance;
          window.duration = response.rows[0].elements[0].duration;

          console.log(window.destAddr);
          console.log(window.distance);
          console.log(window.duration);
        }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="input-button ">
          <div className="center row">
            <input
              className="form-control input-addr col-8"
              ref={this.divSearchBox}
            />
            <button className="btn btn-warning col" onClick={this.getDistance}>
              Search
            </button>
          </div>
        </div>
        <br />
        <div>
          <div className="ggmap center" ref={this.divMap} />
        </div>
      </React.Fragment>
    );
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
