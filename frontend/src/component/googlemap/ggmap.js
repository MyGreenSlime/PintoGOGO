import React, { Component } from "react";
import "./style-ggmap.css";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.divMap = React.createRef();
    this.divSearchBox = React.createRef();
    this.handleDataFromGmap = this.handleDataFromGmap.bind(this);
    this.state = {
      lat: null,
      lng: null,
      dest: null,
      dist: null
    };
  }

  componentDidMount() {
    window.lat = 13.736717;
    window.lng = 100.523186;
    window.stateChange = false;
    window.initMap = this.initMap.bind(this);
    window.getPlaceId = this.getPlaceId.bind(this);
    window.getDistance = this.getDistance.bind(this);
    window.handleSubmit = this.handleSubmit.bind(this);
    window.handleDataFromGmap = this.handleDataFromGmap.bind(this);

    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOmqLlm6CbVBRKXX7Z85K8jhr32pCxQ7M&libraries=places&callback=initMap"
    );
  }

  initMap() {
    // CREATE MAP
    window.myGMap = new window.google.maps.Map(this.divMap.current, {
      center: { lat: 13.736717, lng: 100.523186 },
      zoom: 13
    });

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
      draggable: true
    });

    // CREATE INFOWINDOW
    window.infowindow = new window.google.maps.InfoWindow({
      maxWidth: 180
    });
    window.getPlaceId();

    window.handleDataFromGmap();

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

      window.lat = window.autocomplete.getPlace().geometry.location.lat();
      window.lng = window.autocomplete.getPlace().geometry.location.lng();

      var latlng = new window.google.maps.LatLng(window.lat, window.lng);
      window.marker.setPosition(latlng);

      window.getPlaceId();
      window.handleDataFromGmap();
    });

    // WHEN DRAGEND MARKER
    window.marker.addListener("dragend", function() {
      window.lat = window.marker.getPosition().lat();
      window.lng = window.marker.getPosition().lng();
      window.getPlaceId();
      window.getDistance();
      window.handleDataFromGmap();
    });

    // WHEN MOUSEOVER MARKER & MOUSEOUT
    window.marker.addListener("mouseover", function() {
      window.infowindow.open(window.myGMap, window.marker);
    });
    window.marker.addListener("mouseout", function() {
      window.infowindow.close(window.myGMap, window.marker);
    });
  }

  async getDistance() {
    // Calculate distance from @Computer Building, Kasetsart University
    window.origin = { lat: 13.845955, lng: 100.568674 };
    window.dest = {
      lat: window.marker.getPosition().lat(),
      lng: window.marker.getPosition().lng()
    };

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
          window.distance = response.rows[0].elements[0].distance.value;
          window.duration = response.rows[0].elements[0].duration;
        }
      }
    );
  }

  getPlaceId() {
    // Find a place id from GoogleMap Geocoder
    window.geocoder = new window.google.maps.Geocoder();
    window.latlng = {
      lat: parseFloat(window.lat),
      lng: parseFloat(window.lng)
    };

    window.geocoder.geocode({ location: window.latlng }, function(
      results,
      status
    ) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          window.placeid = results[1].place_id;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });

    // Get a place name from place id
    setTimeout(() => {
      window.service = new window.google.maps.places.PlacesService(
        window.myGMap
      );
      window.service.getDetails(
        {
          placeId: window.placeid
        },
        function(place) {
          window.infowindow.setContent(
            "<div><strong>" +
              place.name +
              "</strong>" +
              place.formatted_address +
              "</div>"
          );
        }
      );
    }, 1000);
  }

  async handleSubmit() {
    // Get lat,lng from marker before send data
    window.lat = window.marker.getPosition().lat();
    window.lng = window.marker.getPosition().lng();

    // Send data to field address
    this.props.handleFromParent(
      window.lat,
      window.lng,
      window.destAddr,
      window.distance
    );
  }

  async handleDataFromGmap() {
    const distPromise = window.getDistance();
    await distPromise;
    setTimeout(() => {
      window.handleSubmit();
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <div className="input-button ">
          <div className="center row">
            <input
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="form-control input-addr"
              placeholder="Enter your address here"
              ref={this.divSearchBox}
            />
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
