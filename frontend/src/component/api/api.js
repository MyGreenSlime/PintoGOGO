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
      this.setState({
        [pack_id]: res.data.data.package_id
      })
      if(path == "add" && !this.state[save]){
        console.log("save")
        this.setState({
          [save]: true
        })
        alert("Save Package Success!");
      }
      else if(path == "addcart"){
        alert("Add to cart success!");
      }
    })
    .catch(function(err){
      console.log(err)
    });
}

export function updateBill(path,id) {
  // axios.put('/api/bills/update/current/'+path, data)
  //   .then(res => {
  //     console.log("add to cart", res)
  //   })
}

/** PUT **/
export function addToCart(path, data){
  axios.put('/api/orders/add/'+path, data)
    .then(res => {
      console.log("add to cart", res)
    })
}

/** DELETE **/
export function deleteFromDB(path, id) {
  axios.delete("api/"+ path +"/del/"+id)
  .then(res => console.log("delete", res))
  .then(() => {
    this.props.onMenuCardDeleted(id);
  });
}
