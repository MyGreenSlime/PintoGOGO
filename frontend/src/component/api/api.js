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
