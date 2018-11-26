import axios from "axios";

/** GET **/
export function getFoodOrSnack(menu, isLoaded, path) {
  axios
    .get("/api/menus/" + path)
    .then(res => {
      console.log("get ", menu);
      this.setState({
        [menu]: res.data,
        [isLoaded]: true
      });
    })
    .then(() => {
      console.log("allmenus ", this.state[menu]);
    });
}

export function getPackage(pack, isLoaded, path) {
  axios
    .get("api/packages/" + path)
    .then(res => {
      console.log("get package");
      this.setState({
        [pack]: res.data,
        [isLoaded]: true
      });
    })
    .then(() => {
      console.log("package ", this.state[pack]);
    });
}

export function getProfile(profile, isLoaded) {
  axios
    .get("/api/users/profile")
    .then(res => {
      console.log("get profile");
      this.setState({
        [profile]: res.data,
        [isLoaded]: true
      });
    })
    .then(() => {
      console.log("user ", this.state[profile]);
    });
}

export function getAddress(address, isLoaded) {
  axios.get("/api/address/current")
  .then(res => {
    this.setState({
      [address]: res.data,
      [isLoaded]: true
    });
  })
  .then(() => {
    console.log("address", this.state[address])
  })
}

/** POST **/
export function addFoodOrSnack(data, status, path) {
  axios.post("/api/menus/" + path + "/add", data)
    .then(res => {
      this.setState({
        [status]: res.data.ok
      });
    })
    .then(() => {
      console.log("redirect");
      this.renderRedirect();
    });
}

/** PUT **/
export function addToCart(path, data){
  axios.put('/api/orders/add/'+path, data)
    .then(res => {
      console.log("add to cart", res)
    })
}

/**  DELETE **/
export function deleteFoodOrSnack(path, id) {
  axios.delete("api/menus/"+ path +"/del/"+id)
  .then(res => console.log("delete", res))
  .then(() => {
    this.props.onMenuCardDeleted(id);
  });
}
