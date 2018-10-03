import React, { Component} from 'react';
import { postData } from '../api/api'

class Addmenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: {},
            status: {}
        }
    }
    handleSubmit(e){
        var pass = true
        if(this.refs.menu_name.value === '') {
            alert('MenuName is required')
            pass = false
        }
        if(this.refs.price.value === '') {
            alert('Price is required')
            pass = false
        }
        if(this.refs.carlories.value === '') {
            alert('carlories is required')
            pass = false
        }
        if(this.refs.protein.value === '') {
            alert('protein is required')
            pass = false
        }
        if(this.refs.carbohydrate.value === '') {
            alert('carlories is required')
            pass = false
        }
        if(this.refs.fat.value === '') {
            alert('fat is required')
            pass = false
        }
        if(this.refs.img_url.value === '') {
            alert('imgurl is required')
            pass = false
        }
        if(pass) {
            this.setState({menu : {
                menu_name : this.refs.menu_name.value,
                price : this.refs.price.value,
                calories : this.refs.carlories.value,
                protein : this.refs.protein.value,
                carbohydrate : this.refs.carbohydrate.value,
                fat : this.refs.fat.value,
                img_url : this.refs.img_url.value
            }}, function() {
                console.log(this.state.menu);
                postData("http://localhost:4000/menus/food/add",this.state.menu)
                
            })
        }
        e.preventDefault();
    }    
    render() {
      return (
        <div> 
            <h3>Add Menu</h3>
            <form onSubmit = {this.handleSubmit.bind(this)}>
                <div>
                    <input ref= "menu_name" type="text" name="menu_name" placeholder="menuname"></input>
                </div>
                <div>
                    <input ref="price" type="number" name="price" placeholder="price"></input>
                </div>
                <div>
                    <input ref="carlories" type="number" name="carlories" placeholder="carlories"></input>
                </div>
                <div>
                    <input ref="protein" type="number" name="protein" placeholder="protein"></input>
                </div>
                <div>
                    <input ref="carbohydrate" type="number" name="carbohydrate" placeholder="carbohydrate"></input>
                </div>
                <div>
                    <input ref="fat" type="number" name="fat" placeholder="fat"></input>
                </div>
                <div>
                    <input ref="img_url" type="text" name="img_url" placeholder="url"></input>
                </div>
                <div>
                    <input type="submit" value="submit"></input>
                </div>
            </form>
        </div>
      );
    }
    
  }

export default Addmenu;