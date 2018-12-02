import React, { Component } from 'react';
import Detail from './detail'

class Snackdetail extends Component {
  render() {
    return (
      <React.Fragment>
        <Detail
          name="snack_name"
          type = "SNACK"
          path_get_data="snack"
          path_to_edit="edit/detail/snack" />
      </React.Fragment>
    );
  }
}

export default Snackdetail;