import React, { Component } from 'react';
import { RestClient } from '../api/api'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Button, FormGroup, Input, FormText } from "reactstrap";
import "./style-addsnack.css";

import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
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
        return <Redirect to='/add/snack' />
    }

    componentDidMount() {
        if(!this.props.auth.user.type) {
            window.location.href = '/';
        }
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
            <React.Fragment>
                <div className="setbg__addsnack">
                    <div className="form-group" className="addsnack__box">
                        <h3>Status : {status}</h3>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup>
                                    <Input type="text" name="snack_name" placeholder="snackname" value={this.state.snack_name} onChange={this.onChangeSnackname} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.onChangePrice} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="carlories" placeholder="carlories" value={this.state.calories} onChange={this.onChangeCalories} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="protein" placeholder="protein" value={this.state.protein} onChange={this.onChangeProtien} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="carbohydrate" placeholder="carbohydrate" value={this.state.carbohydrate} onChange={this.onChangeCarbohydrate} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="fat" placeholder="fat" value={this.state.fat} onChange={this.onChangeFat} required />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="img_url" placeholder="url" value={this.state.img_url} onChange={this.onChangeImgurl} required />
                                </FormGroup>
                                <Button type="submit" value="submit" className="submit__addsnack--button">
                                    SUBMIT
                                </Button>
                            </form>
                        </div>
                    </div>
            </React.Fragment>);
    }

}
Addmenu.propTypes = {
    loginUser : propTypes.func.isRequired,
    auth : propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps, {loginUser})(Addmenu);
