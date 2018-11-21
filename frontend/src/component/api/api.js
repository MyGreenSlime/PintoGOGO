
import axios from 'axios'

export function getFoodOrSnack(menu, isLoaded, path) {
  axios.get("/api/menus/" + path).then(res => {
    console.log("get ",menu)
    this.setState({
      [menu]: res.data,
      [isLoaded]: true
    });
  }).then(()=>{console.log("allmenus ",this.state[menu])})
}

export function getPackage(pack, isLoaded, path){
  axios.get("api/packages"+path).then(res => {
    console.log("get package")
    this.setState({
      [pack] : res.data,
      [isLoaded]: true
    });
  }).then(() => {console.log("package ",this.state[pack])})
}

export function getProfile(profile, isLoaded) {
  axios.get('/api/users/profile')
    .then(res => {
      console.log("get profile")
      this.setState({
        [profile]: res.data,
        [isLoaded]: true
      });
  }).then( () => {console.log(this.state[profile])});
}
