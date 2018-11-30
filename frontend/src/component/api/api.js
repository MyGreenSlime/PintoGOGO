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
}

export function getBills(bill) {
  return axios.get("/api/bills/current")
    .then(res => {
      this.setState({
        [bill]: res.data
      });
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
    .then(() => {
      this.props.currentOrder();
    })
}

export function addPayment(data,status,waiting,current) {
  axios.post("/api/payment/charge", data).then(res => {
    if (res.data.ok === 1) {
      this.setState({
        [status]: true,
        [waiting]: false
      });
      this.props.currentOrder();
    }
  });
  
}

/** PUT **/
export function addToCart(path, data) {
  axios.put('/api/orders/add/'+path, data).then( res => {
    this.props.currentOrder();

  })
}

export function increaseAmount(path, id) {
  axios.put("/api/orders/increase/amount/" + path + "/" + id)
  .then(res => {
    this.props.currentOrder();
  })
}

export function decreaseAmount(path, id) {
  axios.put("/api/orders/decrease/amount/" + path + "/" + id)
    .then(res => {
      this.props.currentOrder();
    })
}

export function addToBill(data) {
  axios.put("/api/orders/tobill", data)
    .then( () => {window.location.href = '/bill'})
}

export function editFoodOrSnack(path, id, data) {
  axios
      .put("/api/menus/" + path + "/edit/" + id, data)
      .then(() => {
        this.renderRedirect();
      });
}

export function updateBill(data){
  axios.put("api/bills/update/current", data)
    .then(() => { window.location.href = '/payment' })
}
export function addAddress(data) {
  axios.put("/api/users/add/address", data)
}

/** DELETE **/
export function deleteFromDB(path, id) {
  axios.delete("/api/"+ path +"/del/"+id)
    .then(res => {
      this.props.currentOrder();
    })
}

export function deleteOrder(path, id) {
  axios.delete("/api/orders/del/" + path + "/" + id)
}


export function deleteAddress(id) {
  axios.delete("/api/users/del/address/" + id)
}