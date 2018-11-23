import React, { Component } from 'react';
import Detail from './detail'

class Snackdetail extends Component {
  render() {
    return (
      <React.Fragment>
        <Detail
          name="snack_name"
          path_get_data="snack/"
          path_to_edit="editsnackdetail" />
      </React.Fragment>
    );
  }
}

export default Snackdetail;