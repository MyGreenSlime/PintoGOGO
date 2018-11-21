import React, {Component} from 'react';
import '../package.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Package7DaysDetail from './pack7DaysDetail.js'
import NoPackage from '../nopackage';

export default class Pack7 extends Component {
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
    axios.get('api/packages/system/7days')
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
				<Link to={'/7days/'+curPack._id}>
					<button className="btn view-pks" onClick={this.sendToPackageDetail.bind(this)}>VIEW PACKAGE</button>
				</Link>
			</div>
      </div>
		</React.Fragment>
		return divpk;
	}
	
	sendToPackageDetail() {	
		return <div>
			<Route path='/7days/:packageId' component={Package7DaysDetail} />
			{console.log("send")}
		</div>
	}

	render() {

		if(!this.state.isLoaded){
      return <div className="loader" />;         
		}
		if(!this.state.packages.data[0]) {
      return <NoPackage />
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
