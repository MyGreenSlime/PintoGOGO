import React, { Component } from 'react';
import { connect } from 'react-redux';
import './detail.css'
import { getFoodOrSnack } from '../api/api';

class SnackDetail extends Component {
    constructor(props) {
        super(props);
        this.findIdFromUrl = this.findIdFromUrl.bind(this)
        this.state = {
            menu: {},
            isLoaded: false
        };

    }
    findIdFromUrl() {
        var url = window.location.href;
        var res = url.split("/");
        const get_detail = getFoodOrSnack.bind(this,"menu","isLoaded",this.props.path_get_data+res[res.length-1])
        get_detail();
    }

    componentDidMount() {
        this.findIdFromUrl();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const users = (
            <div className="row justify-content-center">
                <button type="button" className="menudetail__detail--addtocartbutton">ADD TO CART</button>
            </div>
        )
        const admin = (
            <React.Fragment>
                <div className="row justify-content-center">
                    <a href={"/"+ this.props.path_to_edit + "/" + this.state.menu._id}>
                        <button type="button" className="menudetail__detail--addtocartbutton">{"EDIT "+this.props.type}</button></a>
                </div>
            </React.Fragment>
        )
        if (!this.state.isLoaded) {
            return <div className="loader" />
        }
        return <React.Fragment>
            <div className="menudetail">
                <div className="row menudetail__outside">
                    <div className="col-3 homebutton">
                        <img src="/img/other/left-arrow.png" height="20px" />
                        <a href="/">
                            BACK TO HOMEPAGE
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col menudetail__menuname">
                        {this.state.menu[this.props.name]}
                    </div>
                </div>
                <div className="menudetail__detail--line" />
                <div className="row menudetail__detail">
                    <div className="col-5">
                        <img src={"\\" + this.state.menu.img_url} width="80%" className="menudetail__detail--foodimg" />
                        {isAuthenticated ? users : ""}
                        {user.type ? admin : ""}
                    </div>
                    <div className="col">
                        <div className="row menudetail_detail_description">
                            <p>{this.state.menu.description}</p>
                        </div>
                        <div className='row'>
                            <div className='col-9 cal'>
                                CALORIES
                        </div>
                            {this.state.menu.calories} Kcal
                        </div>
                        <div className="row menudetail__detail--line" />
                        <div className='row'>
                            <div className='col-9'>
                                <p>FAT</p>
                            </div>
                            <p> {this.state.menu.fat} g</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CHOLESTEROL</p>
                            </div>
                            <p> {this.state.menu.cholesterol} mg</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>SODIUM</p>
                            </div>
                            <p>{this.state.menu.sodium} mg</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CARBOHYDRATE</p>
                            </div>
                            <p> {this.state.menu.carbohydrate} g</p>
                        </div>
                        <div className='row '>
                            <div className='col-9'>
                                <p>PROTEIN</p>
                            </div>
                            <p> {this.state.menu.protein} g</p>
                        </div>
                        <div className='row menudetail__detail__price'>
                            <div className='col-9'>
                                <p>PRICE</p>
                            </div>
                            <p> {this.state.menu.price} ฿</p>
                        </div>
                    </div>
                </div>
                <div className="row menudetaiil__summary--row">
                    <div className="col-4 menudetaiil__summary--col">
                        <p>{this.state.menu.protein} G</p>
                        PROTEIN
                    </div>
                    <div className="col-4 menudetaiil__summary--col">
                        <p>{this.state.menu.calories} G</p>
                        CALORIES
                    </div>
                    <div className="col-4 menudetaiil__summary--col">
                        <p> {this.state.menu.carbohydrate} G</p>
                        CARBOHYDRATE
                    </div>
                </div>
            </div>

        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SnackDetail);