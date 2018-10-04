import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class DemoMenu extends React.Component {
  render() {
    return (
      <Container>
        
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm .col-sm-offset-1</Col>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm .col-sm-offset-1</Col>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm .col-sm-offset-1</Col>
          <Col sm={{ size: 'auto', offset: 1 }}>.col-sm .col-sm-offset-1</Col>
        </Row>
      </Container>
    );
  }
}
// class DemoMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menus: [],
//       isLoaded: false,
//     }
//   }

//   componentDidMount() {
//     fetch('http://localhost:4000/menus/food')
//     .then(res => res.json())
//     .then(json => {
//       this.setState({
//         isLoaded: true,
//         menus: json,
//       })
//     })
//   }

//   render() {
//     var {isLoaded, menus} = this.state;
//     if(!isLoaded) {
//       return <div>loading....</div>
//     }
//       return (
//         <div> 
//           <CardImg src={menus[2].img_url} />
//           {menus.map(menus =>(
//              <Card key={menus._id}>
//              <CardImg  top width="50%" src={menus.img_url} alt="Card image cap" />
//              <CardBody>
//                <CardTitle >{menus.menu_name}</CardTitle>
//                <CardSubtitle >{menus.price}</CardSubtitle>
//                <CardSubtitle >{menus.protein}</CardSubtitle>
//                <CardSubtitle >{menus.carbohydrate}</CardSubtitle>
//                <Button>Button</Button>
//              </CardBody>
//            </Card>
//           ))}
//         </div>
//       );
//     }
    
//   }

// export default DemoMenu;