import React, {Component} from 'react';
import './mypackage.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Package3DaysDetail from '../package/3days/pack3DaysDetail'
import Package5DaysDetail from '../package/3days/pack3DaysDetail'
import Package7DaysDetail from '../package/7days/pack7DaysDetail'

export default class MyPackage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false, 
    }
		this.createDivPackage = this.createDivPackage.bind(this);
		this.sendToPackageDetail = this.sendToPackageDetail.bind(this);
  }

  componentDidMount() {
    axios.get('api/packages/user/all')
    .then(res => {
      this.setState ({
        packages: res,
        isLoaded: true,
      });
    })
    .then(() => {console.log("package", this.state.packages.data)})
  }

  createDivPackage(curPack) {
    let divpk = 
    <React.Fragment>
        <div className='set-frame-pks'>
      <div className="set-each-package row">
			<div className="col-sm-4">
				<img className="img-pack" src={curPack.day_meal[0].meal_1.img_url} />
			</div>
			<div className="col-sm dis-grid">
				<div>
					<p className="name-each-pks">{curPack.name_package}</p>
					<p>{curPack.description}</p>
				</div>
				<Link to={'/3days/'+curPack._id}>
					<button className="btn view-pks" onClick={this.sendToPackageDetail.bind(this)}>VIEW PACKAGE</button>
				</Link>
			</div>
      </div>
      </div>
		</React.Fragment>
		return divpk;
	}
	
	sendToPackageDetail() {	
		return <div>
			<Route path='/3days/:packageId' component={Package3DaysDetail} />
			{console.log("send")}
		</div>
	}

	render() {

		if(!this.state.isLoaded){
      return <div className="loader" />;         
		}

		const listPackages = this.state.packages.data.map((pk,index) => 
			<div key={index}>
				{this.createDivPackage(pk)}
			</div>
		);
		console.log(typeof this.state.packages.data)

		return (
			<React.Fragment>
				{listPackages}
			</React.Fragment>
		);
	}
}
