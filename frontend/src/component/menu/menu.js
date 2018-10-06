import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Container, Row, Col} from 'reactstrap';
import CardMenu from '../cardmenu/cardmenu';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
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
    fetch('http://localhost:4000/menus/food')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        menus: json,
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
    
    var {isLoaded, menus, firstImg, secondImg, thirdImg, forthImg, fifthImg, sixthImg} = this.state;
    
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
            {menus[firstImg] &&<CardMenu name={menus[firstImg].menu_name} picture={menus[firstImg].img_url} calories={menus[firstImg].calories}/> }
            </Col>
            <Col >
            {menus[secondImg] &&<CardMenu name={menus[secondImg].menu_name} picture={menus[secondImg].img_url} calories={menus[secondImg].calories}/> }
            </Col>
            <Col >
            {menus[thirdImg] && <CardMenu name={menus[thirdImg].menu_name} picture={menus[thirdImg].img_url} calories={menus[thirdImg].calories}/> }
            </Col>
          </Row>
          
          <Row className="secondrow">
            <Col >
            {menus[forthImg] && <CardMenu name={menus[forthImg].menu_name} picture={menus[forthImg].img_url} calories={menus[forthImg].calories}/> } 
            </Col>
            <Col>
            {menus[fifthImg] &&<CardMenu name={menus[fifthImg].menu_name} picture={menus[fifthImg].img_url} calories={menus[fifthImg].calories}/> }
            </Col>
            <Col>
            {menus[sixthImg] &&<CardMenu name={menus[sixthImg].menu_name} picture={menus[sixthImg].img_url} calories={menus[sixthImg].calories}/> }
            </Col>
          </Row>
          
        </div>
      );
    }
    
  }

export default Menu;