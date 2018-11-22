import React, {Component} from 'react';
import './linkwithprev.css';
import {Link} from 'react-router-dom'

export default class LinkWithPrev extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("props",this.props)
        return (
            <Link to={{
              pathname: this.props.to,
              state: { prevLocation: window.location.href }
            }}>
              {this.props.children}
            </Link>
          );
    }
}