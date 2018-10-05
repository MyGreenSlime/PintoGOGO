import React, { Component } from 'react';

class Googlelogin extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <a href="./construct">
                    <img src="/img/login/google-sign-in.png" className="google__login--button"/>
                </a>
            </div>
         );
    }
}
 
export default Googlelogin;