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

  render() {
    
    var {isLoaded, menus} = this.state;
    if(!isLoaded) {
      return <div>loading....</div>
    }
      return (
        <div> 
          <Row>
            <Col sm={{ size: 'auto'}}>
              <CardMenu name={menus[0].menu_name} picture={menus[0].img_url} calories={menus[0].calories}/>
            </Col>
            <Col sm={{ size: 'auto' }}>
              <CardMenu name={menus[1].menu_name} picture={menus[1].img_url} calories={menus[1].calories}/>
            </Col>
            <Col sm={{ size: 'auto'}}>
            <CardMenu name={menus[2].menu_name} picture={menus[2].img_url} calories={menus[2].calories}/>
            </Col>
          </Row>
          
        </div>
      );
    }
    
  }

export default Menu;