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
    .get("/api/packages/" + path)
    .then(res => {
      console.log("api get package");
      this.setState({
        [pack]: res.data,
        [isLoaded]: true
      });
      console.log("set ",this.state[pack])
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

export function getCurrentOrder(order, isLoaded) {
  axios
      .get("/api/orders/current")
      .then(res => {
        this.setState({
          [order]: res.data,
          [isLoaded]: true
        });
      })
      .then(() => {
        console.log("order ", this.state.order);
      });
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

export function addOrSavePackageToCart(data,path,save,pack_id){
  axios.post("/api/packages/"+path,data)
    .then( res => {
      console.log("id",res.data.data.package_id)
      this.setState({
        [pack_id]: res.data.data.package_id
      })
      if(path === "add" && !this.state[save]){
        console.log("save")
        this.setState({
          [save]: true
        })
        alert("Save Package Success!");
      }
      else if(path === "addcart"){
        alert("Add to cart success!");
      }
    })
    .catch(function(err){
      console.log(err)
    });
}

/** PUT **/
export function addToCart(path, data) {
  axios.put('/api/orders/add/'+path, data)
    .then(res => {
      console.log("add to cart", res)
    })
}

export function increaseAmount(path, id) {
  axios.put("/api/orders/increase/amount/" + path + "/" + id)
    .then(res => {
      console.log("increase", res.data);
    })
}

export function decreaseAmount(path, id) {
  axios.put("/api/orders/decrease/amount/" + path + "/" + id)
    .then(res => {
      console.log("decrease", res.data);
    })
}

export function addToBill(data) {
  axios.put("/api/orders/tobill", data)
    .then(res => console.log("add to bill", res));
}

export function editFoodOrSnack(path, id, data) {
  axios
      .put("/api/menus/" + path + "/edit/" + id, data)
      .then(res => {
        console.log("edit "+path, res)
      })
      .then(() => {
        console.log("redirect");
        this.renderRedirect();
      });
}

/** DELETE **/
export function deleteFromDB(path, id) {
  axios.delete("/api/"+ path +"/del/"+id)
  .then(res => console.log("delete", res))
  
}

export function deleteFoodOrder(path, id) {
  axios.delete("/api/orders/del/"+ path +"/"+id)
  .then(res => console.log("delete food", res))
}

export function deleteSnackOrder(path, id) {
  axios.delete("api/orders/del/"+ path +"/"+id)
  .then(res => console.log("delete snack", res))
} 

export function deletePackageOrder(path, id) {
  axios.delete("api/orders/del/"+ path +"/"+id)
  .then(res => console.log("delete order", res))
}


