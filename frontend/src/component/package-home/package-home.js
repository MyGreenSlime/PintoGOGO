import React, { Component } from 'react';
import './style-package-home.css'
class PackageHome extends Component {

  constructor(props){
    super(props)
  }

  render() { 
      return <React.Fragment>
          <div className="row">
            <div className="col box">
              <div className="desc--text">
                Choose package
              </div>
              <a href="package" style={{ color: "black" }} className="btn topic--text">
                choose your package
              </a>
            </div>
            <div className="col box">
              <div className="desc--text">Create your own package with your satisfaction</div>
              <a href="packagemanage" style={{ color: "black" }} className="btn topic--text">
                create your own package
              </a>
            </div>
          </div>
        </React.Fragment>;
  }
}
 
export default PackageHome;