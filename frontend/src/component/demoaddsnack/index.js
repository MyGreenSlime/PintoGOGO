import React, { Component } from 'react';
import { RestClient } from '../api/api'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
class Addmenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snack_name: "",
            price: "",
            calories: "",
            protein: "",
            carbohydrate: "",
            fat: "",
            img_url: "",
            status: 0
        }
        this.onChangeSnackname = this.onChangeSnackname.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangeCalories = this.onChangeCalories.bind(this)
        this.onChangeCarbohydrate = this.onChangeCarbohydrate.bind(this)
        this.onChangeFat = this.onChangeFat.bind(this)
        this.onChangeImgurl = this.onChangeImgurl.bind(this)
        this.onChangeProtien = this.onChangeProtien.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    renderRedirect() {
        return <Redirect to='/demoaddmenu' />
    }

    onChangeSnackname(e) {
        this.setState({
            snack_name: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeCalories(e) {
        this.setState({
            calories: e.target.value
        })
    }

    onChangeProtien(e) {
        this.setState({
            protein: e.target.value
        })
    }

    onChangeCarbohydrate(e) {
        this.setState({
            carbohydrate: e.target.value
        })
    }
    onChangeFat(e) {
        this.setState({
            fat: e.target.value
        })
    }

    onChangeImgurl(e) {
        this.setState({
            img_url: e.target.value
        })
    }

    handleSubmit(e) {
        //var pass = true
        // if(this.refs.menu_name.value === '') {
        //     alert('MenuName is required')
        //     pass = false
        // }
        // if(this.refs.price.value === '') {
        //     alert('Price is required')
        //     pass = false
        // }
        // if(this.refs.carlories.value === '') {
        //     alert('carlories is required')
        //     pass = false
        // }
        // if(this.refs.protein.value === '') {
        //     alert('protein is required')
        //     pass = false
        // }
        // if(this.refs.carbohydrate.value === '') {
        //     alert('carlories is required')
        //     pass = false
        // }
        // if(this.refs.fat.value === '') {
        //     alert('fat is required')
        //     pass = false
        // }
        // if(this.refs.img_url.value === '') {
        //     alert('imgurl is required')
        //     pass = false
        // }
        // if(pass) {
        //     this.setState({menu : {
        //         menu_name : this.refs.menu_name.value,
        //         price : this.refs.price.value,
        //         calories : this.refs.carlories.value,
        //         protein : this.refs.protein.value,
        //         carbohydrate : this.refs.carbohydrate.value,
        //         fat : this.refs.fat.value,
        //         img_url : this.refs.img_url.value
        //     }}, function() {
        //         console.log(this.state.menu);
        //         RestClient.post("http://localhost:4000/menus/food/add",this.state.menu)
        //             .then(resstatus => this.setState({status : resstatus}));
        //     })
        // }
        const menudetail = {
            snack_name: this.state.snack_name,
            price: this.state.price,
            calories: this.state.calories,
            protein: this.state.protein,
            carbohydrate: this.state.carbohydrate,
            fat: this.state.fat,
            img_url: this.state.img_url
        }
        axios.post('http://localhost:4000/menus/snack/add', menudetail)
            .then(res => {
                this.setState({ status: res.data })
            })
        if (this.state.status == 200) {
            this.renderRedirect()
        }
        e.preventDefault()
    }
    render() {
        const { status } = this.state;
        return (
            <div>
                <h3>Status : {status}</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <input type="text" name="snack_name" placeholder="snackname" value={this.state.snack_name} onChange={this.onChangeSnackname} required ></input>
                    </div>
                    <div>
                        <input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.onChangePrice} required ></input>
                    </div>
                    <div>
                        <input type="number" name="carlories" placeholder="carlories" value={this.state.calories} onChange={this.onChangeCalories} required ></input>
                    </div>
                    <div>
                        <input type="number" name="protein" placeholder="protein" value={this.state.protein} onChange={this.onChangeProtien} required ></input>
                    </div>
                    <div>
                        <input type="number" name="carbohydrate" placeholder="carbohydrate" value={this.state.carbohydrate} onChange={this.onChangeCarbohydrate} required ></input>
                    </div>
                    <div>
                        <input type="number" name="fat" placeholder="fat" value={this.state.fat} onChange={this.onChangeFat} required ></input>
                    </div>
                    <div>
                        <input type="text" name="img_url" placeholder="url" value={this.state.img_url} onChange={this.onChangeImgurl} required ></input>
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