import React, { Component } from "react";
import "../recommend/style-recommend.css";
import axios from 'axios';

export default class Recommend extends Component {

  constructor() {
    super();
    this.state = {
      menus: [],
			isLoaded: false
    }
  }

  componentDidMount() {
    axios.get('/api/menus/food')
    .then(res => {
      this.setState({ 
				isLoaded: true, 
				menus: res.data,
			});
		})
		.then(() => {
			console.log(this.state.menus)
		});
  }
  render() {
    const {	menus,
      isLoaded, 
    } = this.state;

    if (!!!isLoaded) {
      return <React.Fragment />
    }
    {console.log("menu:",menus)}
    return (
      <section className="recommend__block" fluid>
        <div className="set-recommend">
          <b style={{fontSize: "20px"}}>Recommended</b>
          <div className="grid-recommend">
            <div>
              <img className="img-rec" src={menus[1].img_url}/>
               {menus[1].menu_name}
            </div>
            <div>
              <img className="img-rec" src={menus[3].img_url} />
              {menus[3].menu_name}
            </div>
            <div>
              <img className="img-rec" src={menus[2].img_url} />
              {menus[2].menu_name}
            </div>
            <div>
              <img className="img-rec" src={menus[0].img_url} />
              {menus[0].menu_name}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
