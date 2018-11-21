// import React, { Component} from 'react';
// function postData(url = ``, data = {}) {
//     // Default options are marked with *
//       return fetch(url, {
//           method: "POST", // *GET, POST, PUT, DELETE, etc.
//           mode: "cors", // no-cors, cors, *same-origin
//           cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//           credentials: "same-origin", // include, same-origin, *omit
//           headers: {
//               "Content-Type": "application/json; charset=utf-8",
//               // "Content-Type": "application/x-www-form-urlencoded",
//           },
//           redirect: "follow", // manual, *follow, error
//           referrer: "no-referrer", // no-referrer, *client
//           body: JSON.stringify(data), // body data type must match "Content-Type" header
//       })
//         .then(res => res.status)
//     }


// export const RestClient = {
//     post: postData
// };
import axios from 'axios'

export function getFoodOrSnack(menu, isLoaded, path) {
  console.log("get menu outside axios")
  axios.get("/api/menus/" + path).then(res => {
    console.log("get menu inside axios")
    this.setState({
      [menu]: res.data,
      [isLoaded]: true
    });
  }).then(()=>{console.log("allmenus ",this.state[menu])})
}

