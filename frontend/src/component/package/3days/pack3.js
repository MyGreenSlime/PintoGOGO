import React, {Component} from 'react';
import '../package.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Package3DaysDetail from './pack3DaysDetail.js'

export default class Pack3 extends Component {
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
    axios.get('api/packages/system/3days')
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
