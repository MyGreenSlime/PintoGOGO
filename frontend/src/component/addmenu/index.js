import React, { Component} from 'react';
import axios from 'axios'
import {Button, FormGroup, Input } from "reactstrap";
import './style-addmenu.css'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

class Addmenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu_name : "",
            price : "",
            calories : "",
            protein : "",
            carbohydrate : "",
            fat : "",
            img_url : "",
            description : "",
            sodium : "",
            cholesterol : "",
            status: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // cannot redirect I don't know why
    renderRedirect(){
        return  <Redirect to = {{
            pathname : "/add/menu"
        }}/>
    }

    componentDidMount() {
        if(!this.props.auth.user.type) {
            return  this.props.history.push('/');
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    handleSubmit(e) {
       
        const menudetail = {
            menu_name : this.state.menu_name,
            price : this.state.price,
            calories : this.state.calories,
            protein : this.state.protein,
            carbohydrate : this.state.carbohydrate,
            fat : this.state.fat,
            description : this.state.description,
            sodium : this.state.sodium,
            cholesterol : this.state.cholesterol,
            img_url : this.state.img_url
        }
        axios.post('http://localhost:4000/menus/food/add', menudetail)
        .then(res => {
            this.setState({status : res.data})
        })
        .then(() => {
            console.log('redirect');
            this.renderRedirect()
        })
        e.preventDefault()
    }    
    render() {
        const { status } = this.state;
        return (
            <React.Fragment>
                <div className="setbg__addmenu">
                    <div className="form-group" className="addmenu__box">
                        <h3>Status : {status}</h3>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup>
                                <Input type="text" name="menu_name" placeholder="menuname" value={this.state.menu_name} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="calories" placeholder="carlories" value={this.state.calories} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="protein" placeholder="protein" value={this.state.protein} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="carbohydrate" placeholder="carbohydrate" value={this.state.carbohydrate} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="fat" placeholder="fat" value={this.state.fat} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="sodium" placeholder="sodium" value={this.state.sodium} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="cholesterol" placeholder="cholesterol" value={this.state.cholesterol} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="img_url" placeholder="url" value={this.state.img_url} onChange={this.handleChange} required />
                            </FormGroup>
                            <Button type="submit" value="submit" className="submit__addmenu--button">
                                SUBMIT
                            </Button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    
}
Addmenu.propTypes = {
    auth : propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps)(withRouter(Addmenu));