import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Container, Row, Col} from 'reactstrap';
import CardMenu from '../cardmenu/cardmenu';

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
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/menus/snack')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        snacks: json,
      })
    })
    
  }

  rightClick(e){
    console.log('Click!!!!');
    this.setState({
      firstImg: this.state.firstImg+6,
      secondImg: this.state.secondImg+6,
      thirdImg: this.state.thirdImg+6,
      forthImg: this.state.forthImg+6,
      fifthImg: this.state.fifthImg+6,
      sixthImg: this.state.sixthImg+6,
    })
    e.preventDefault();
  }  

  leftClick(e){
    console.log('Click!!!!');
    this.setState({
      firstImg: this.state.firstImg-6,
      secondImg: this.state.secondImg-6,
      thirdImg: this.state.thirdImg-6,
      forthImg: this.state.forthImg-6,
      fifthImg: this.state.fifthImg-6,
      sixthImg: this.state.sixthImg-6,
    })
    e.preventDefault();
  }

  render() {
    
    var {isLoaded, snacks, firstImg, secondImg, thirdImg, forthImg, fifthImg, sixthImg} = this.state;
    
    if(!isLoaded) {
      return <div>loading....</div>
    }
      return (
        <div className="menuzone"> 
        <div className="rightClickMenu"  onClick ={this.rightClick.bind(this)}>
          <img src={"/img/other/right-arrow.png"} height="20"/>
        </div>  

        <div className="leftClickMenu"  onClick ={this.leftClick.bind(this)}>
          <img src={"/img/other/left-arrow.png"} height="20"/>
        </div>  
          <Row className="firstrow">
            <Col >
            {snacks[firstImg] &&<CardMenu name={snacks[firstImg].snack_name} picture={snacks[firstImg].img_url} calories={snacks[firstImg].calories}/> }
            </Col>
            <Col >
            {snacks[secondImg] &&<CardMenu name={snacks[secondImg].snack_name} picture={snacks[secondImg].img_url} calories={snacks[secondImg].calories}/> }
            </Col>
            <Col >
            {snacks[thirdImg] && <CardMenu name={snacks[thirdImg].snack_name} picture={snacks[thirdImg].img_url} calories={snacks[thirdImg].calories}/> }
            </Col>
          </Row>
          
          <Row className="secondrow">
            <Col >
            {snacks[forthImg] && <CardMenu name={snacks[forthImg].snack_name} picture={snacks[forthImg].img_url} calories={snacks[forthImg].calories}/> } 
            </Col>
            <Col>
            {snacks[fifthImg] &&<CardMenu name={snacks[fifthImg].snack_name} picture={snacks[fifthImg].img_url} calories={snacks[fifthImg].calories}/> }
            </Col>
            <Col>
            {snacks[sixthImg] &&<CardMenu name={snacks[sixthImg].snack_name} picture={snacks[sixthImg].img_url} calories={snacks[sixthImg].calories}/> }
            </Col>
          </Row>
          
        </div>
      );
    }
    
  }

export default Snack;