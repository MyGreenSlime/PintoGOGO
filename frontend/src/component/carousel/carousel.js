import React, { Component } from "react";

import "../carousel/style-carousel.css";

export default class CarouselFood extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="showcase">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#myCarousel" data-slide-to={1} />
            <li data-target="#myCarousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item carousel-image-1 active" />
            <div className="carousel-item carousel-image-2" />
            <div className="carousel-item carousel-image-3" />
          </div>
          <a
            href="#myCarousel"
            data-slide="prev"
            className="carousel-control-prev"
          >
            <span className="carousel-control-prev-icon" />
          </a>
          <a
            href="#myCarousel"
            data-slide="next"
            className="carousel-control-next"
          >
            <span className="carousel-control-next-icon" />
          </a>
        </div>
      </section>
    );
  }
}
