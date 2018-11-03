import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Row } from "reactstrap";
import CardMenu from "../cardsnack/cardsnack";
import "../snack/snack.css";
import axios from "axios";

class Snack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snacks: {},
      isLoaded: false,
      firstImg: 0,
      secondImg: 1,
      thirdImg: 2,
      forthImg: 3,
      fifthImg: 4,
      sixthImg: 5,
      length_snack: 0
    };
    this.checkFirstSnackSet = this.checkFirstSnackSet.bind(this);
    this.checkLastSnackSet = this.checkLastSnackSet.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/menus/snack")
      .then(response => {
        this.setState({
          isLoaded: true,
          snacks: response.data
        });
      })
      .then(
        this.setState({
          length_snack: Object.keys(this.state.snacks).length
        })
      );
  }

  rightClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg + 6,
      secondImg: this.state.secondImg + 6,
      thirdImg: this.state.thirdImg + 6,
      forthImg: this.state.forthImg + 6,
      fifthImg: this.state.fifthImg + 6,
      sixthImg: this.state.sixthImg + 6
    });
    e.preventDefault();
  }

  leftClick(e) {
    console.log("Click!!!!");
    if (this.state.firstImg - 6 >= 0) {
      this.setState({
        firstImg: this.state.firstImg - 6,
        secondImg: this.state.secondImg - 6,
        thirdImg: this.state.thirdImg - 6,
        forthImg: this.state.forthImg - 6,
        fifthImg: this.state.fifthImg - 6,
        sixthImg: this.state.sixthImg - 6
      });
    }
    e.preventDefault();
  }

  checkFirstSnackSet() {
    let img = "";
    if (this.state.firstImg - 6 >= 0) {
      img = <img src="/img/other/left-arrow.png" height="20" />;
    }
    console.log("left ", img);
    return img;
  }

  checkLastSnackSet() {
    let img = "";
    if (
      this.state.firstImg <= this.state.snacks.length &&
      this.state.secondImg <= this.state.snacks.length &&
      this.state.thirdImg <= this.state.snacks.length &&
      this.state.forthImg <= this.state.snacks.length &&
      this.state.fifthImg <= this.state.snacks.length &&
      this.state.sixthImg <= this.state.snacks.length &&
      this.state.snacks.length != 0
    ) {
      img = (
        <img
          className="imgbutton"
          src="/img/other/right-arrow.png"
          height="20"
        />
      );
    }
    console.log("right ", img);
    return img;
  }

  render() {
    const {
      isLoaded,
      snacks,
      firstImg,
      secondImg,
      thirdImg,
      forthImg,
      fifthImg,
      sixthImg
    } = this.state;

    if (!isLoaded) {
      return <div class="loader"/>;
    }
    return (
      <div className="snackzone">
        <div className="mergerow-left__snack">
          <div onClick={this.leftClick.bind(this)}>
            {this.checkFirstSnackSet()}
          </div>
        </div>

        <Row className="firstrow">
          {snacks[firstImg] && (
            <CardMenu
              name={snacks[firstImg].snack_name}
              picture={snacks[firstImg].img_url}
              calories={snacks[firstImg].calories}
              id={snacks[firstImg]._id}
            />
          )}

          {snacks[secondImg] && (
            <CardMenu
              name={snacks[secondImg].snack_name}
              picture={snacks[secondImg].img_url}
              calories={snacks[secondImg].calories}
              id={snacks[secondImg]._id}
            />
          )}

          {snacks[thirdImg] && (
            <CardMenu
              name={snacks[thirdImg].snack_name}
              picture={snacks[thirdImg].img_url}
              calories={snacks[thirdImg].calories}
              id={snacks[thirdImg]._id}
            />
          )}
        </Row>

        <div className="mergerow-right__snack">
          <div onClick={this.rightClick.bind(this)}>
            {this.checkLastSnackSet()}
          </div>
        </div>

        <Row className="secondrow">
          {snacks[forthImg] && (
            <CardMenu
              name={snacks[forthImg].snack_name}
              picture={snacks[forthImg].img_url}
              calories={snacks[forthImg].calories}
              id={snacks[forthImg]._id}
            />
          )}

          {snacks[fifthImg] && (
            <CardMenu
              name={snacks[fifthImg].snack_name}
              picture={snacks[fifthImg].img_url}
              calories={snacks[fifthImg].calories}
              id={snacks[fifthImg]._id}
            />
          )}

          {snacks[sixthImg] && (
            <CardMenu
              name={snacks[sixthImg].snack_name}
              picture={snacks[sixthImg].img_url}
              calories={snacks[sixthImg].calories}
              id={snacks[sixthImg]._id}
            />
          )}
        </Row>
        <div />
      </div>
    );
  }
}

export default Snack;
