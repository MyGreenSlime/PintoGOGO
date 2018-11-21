import React, {Component} from 'react';
import './mypackage.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Package3DaysDetail from '../package/3days/pack3DaysDetail'
import Package5DaysDetail from '../package/3days/pack3DaysDetail'
import Package7DaysDetail from '../package/7days/pack7DaysDetail'
import NoPackage from '../package/nopackage';

export default class MyPackage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false,
      option: "/mypackage" 
    }
		this.createDivPackage = this.createDivPackage.bind(this);
        this.sendToPackageDetail = this.sendToPackageDetail.bind(this);
        this.deleteFromDb = this.deleteFromDb.bind(this);
  }

  deleteFromDb(curPack){
    axios.delete('api/packages/del/'+ curPack._id)
    .then(res => console.log(res))
    .then(() => {
    });
      
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
    var path = "/"+curPack.type+"days/";
    let divpk = 
    <React.Fragment>
      <div className="set-each-mypackage row">
			<div className="col-sm-4">
				<img className="img-mypack" src={curPack.day_meal[0].meal_1.img_url} />
			</div>
			<div className="col-sm">
				<div className="detail">
					<div className="name-each-mypks">{curPack.name_package}</div>
					<p>{curPack.type} day package</p>
				</div>
                <div className="row">
                <div className="col-sm">
				<Link to={path+curPack._id}>
					<button className="btn view-mypks" onClick={this.sendToPackageDetail(curPack)}>View Package</button>
				</Link> 
                </div>
                <div className="col-sm">
                <button className="btn view-mypks" onClick={() => this.deleteFromDb(curPack)}>Delete Package</button>
                </div>
                </div>
			</div>
      </div>
		</React.Fragment>
		return divpk;
	}
	
	sendToPackageDetail(curPack) {	
        var path = "/"+curPack.type+"days/:packageId";
        var type = {Package3DaysDetail};
        if (curPack.type === 5) type = {Package5DaysDetail};
        else if (curPack.type === 7) type= {Package7DaysDetail};
		return <div>
			<Route path={path} component={type} option={this.state.option} />
			{console.log("send")}
		</div>
	}

	render() {

		if(!this.state.isLoaded){
      return <div className="loader" />;         
    }
    if(!this.state.packages.data[0]) {
      return(
      <div className='set-screen-mypack'>
        <div className='set-frame-mypks'> 
          <h3>My Package</h3>
          <NoPackage />
        </div>
      </div>
      )
    }

		const listPackages = this.state.packages.data.map((pk,index) => 
			<div key={index}>
				{this.createDivPackage(pk)}
			</div>
		);
		console.log(typeof this.state.packages.data)

		return (
			<React.Fragment>
                <div className='set-screen-mypack'>
                    <div className='set-frame-mypks'>
                    <h3>My Package</h3>
                        {listPackages}
                    </div>
                </div>
			</React.Fragment>
		);
	}
}
