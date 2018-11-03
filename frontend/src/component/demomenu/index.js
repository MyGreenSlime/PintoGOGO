import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios'
class DemoMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/menus/food')
      .then(res => {
        const allmenus = res.data
        this.setState({isLoaded: true , menus: allmenus})
      })
  }

  render() {
    var {isLoaded, menus} = this.state;
    if(!isLoaded) {
      return <div>loading....</div>
    }
      return (
        <div> 
          {menus.map(menus =>(
             <Card key={menus._id}>
             <CardImg  top width="50%" src={menus.img_url} alt="Card image cap" />
             <CardBody>
               <CardTitle >{menus.menu_name}</CardTitle>
               <CardSubtitle >{menus.price}</CardSubtitle>
               <CardSubtitle >{menus.protein}</CardSubtitle>
               <CardSubtitle >{menus.carbohydrate}</CardSubtitle>
               <Button>Button</Button>
             </CardBody>
           </Card>
          ))}
        </div>
      );
    }
    
  }

export default DemoMenu;