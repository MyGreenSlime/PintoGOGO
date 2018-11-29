import axios from "axios";

/** GET **/
export function getFoodOrSnack(menu, isLoaded, path) {
  axios
    .get("/api/menus/" + path)
    .then(res => {
      this.setState({
        [menu]: res.data,
        [isLoaded]: true
      });
    })
}

export function getPackage(pack, isLoaded, path) {
  axios
    .get("/api/packages/" + path)
    .then(res => {
      this.setState({
        [pack]: res.data,
        [isLoaded]: true
      });
    })
}

export function getProfile(profile, isLoaded) {
  axios
    .get("/api/users/profile")
    .then(res => {
      this.setState({
        [profile]: res.data,
        [isLoaded]: true
      });
    })
}

export function getAddress(address, isLoaded) {
  axios.get("/api/address/current")
  .then(res => {
    this.setState({
      [address]: res.data,
      [isLoaded]: true
    });
  })
}

export function getCurrentOrder(order, isLoaded) {
  axios
      .get("/api/orders/current")
      .then(res => {
        this.setState({
          [order]: res.data,
          [isLoaded]: true
        });
      })
      .then(() => console.log("order", this.state[order]))
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
      this.renderRedirect();
    });
}

export function addOrSavePackageToCart(data,path,save,pack_id){
  axios.post("/api/packages/"+path,data)
    .then( res => {
      this.setState({
        [pack_id]: res.data.data.package_id
      })
      if(path === "add" && !this.state[save]){
        this.setState({
          [save]: true
        })
        alert("Save Package Success!");
      }
      else if(path === "addcart"){
        alert("Add to cart success!");
      }
    })
}

/** PUT **/
export function addToCart(path, data) {
  axios.put('/api/orders/add/'+path, data)
}

export function increaseAmount(path, id) {
  axios.put("/api/orders/increase/amount/" + path + "/" + id)
}

export function decreaseAmount(path, id) {
  axios.put("/api/orders/decrease/amount/" + path + "/" + id)
}

export function addToBill(data) {
  axios.put("/api/orders/tobill", data)
}

export function editFoodOrSnack(path, id, data) {
  axios
      .put("/api/menus/" + path + "/edit/" + id, data)
      .then(() => {
        this.renderRedirect();
      });
}

/** DELETE **/
export function deleteFromDB(path, id) {
  axios.delete("/api/"+ path +"/del/"+id)
}

export function deleteOrder(path, id) {
  axios.delete("/api/orders/del/"+ path +"/"+id)
}


