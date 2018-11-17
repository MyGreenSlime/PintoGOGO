import React, { Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import '../menudetail/menudetail.css';

class MenuDetail extends Component {
    constructor(props){
        super(props);
        this.findIdFromUrl = this.findIdFromUrl.bind(this)
        this.state={
            food: {},
            isLoaded : false
        };

    }
    findIdFromUrl(){
        var url = window.location.href;
        var res = url.split("/");
        axios.get("/api/menus/food/" + res[res.length-1])
        .then(response => {
            this.setState({
              isLoaded : true,
              food: response.data
            });
        })
    }

    componentDidMount() {
        this.findIdFromUrl();
    }

    editMenu(){
        // axios.post('http://localhost:4000/menus/food/add/' + this.state.food._id)
        // .then(res => console.log(res))
        
    }

    render(){
        const { isAuthenticated, user} = this.props.auth;
        const users = (
            <div className="row justify-content-center">
                            <button type="button" className="addtocartbutton">ADD TO CART</button>
            </div>
        )
        const admin = (
            <React.Fragment>
                {/* <div className="menudetail__edit__button edit--menu__button"> */}
                    <div className="row justify-content-center">
                        <a href={'/editmenudetail/'+ this.state.food._id}>
                        <button type="button" className="addtocartbutton">EDIT CART</button></a>
                    </div>
                {/* </div> */}
            </React.Fragment>
        )
        if(!this.state.isLoaded){
            return <div className="loader"/>
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
                <div className ="row">
                    <div className="col menudetail__menuname">
                        {this.state.food.menu_name}
                    </div>
                </div>
                <div className="line" />

                <div className="row menudetail__detail">
                    <div className="col-5">
                        <img src={"\\"+this.state.food.img_url} width="80%" className="menudetail__detail--foodimg" />
                        <div className="row justify-content-center">
                            <button type="button" className="menudetail__detail--addtocartbutton">ADD TO CART</button>
                        </div>
                        <img src={"\\"+this.state.food.img_url} width="80%" className="foodimg" />
                        {isAuthenticated? users : ""}
                        {user.type? admin : ""}
                    </div>
                    <div className="col">
                        <div className="row descript">
                            <p>{this.state.food.description}</p>
                        </div>
                        <div className='row'>
                        <div className='col-9 cal'>
                            CALORIES
                        </div>
                            {this.state.food.calories} Kcal
                        </div>
                        <div className="row line" /> 
                        <div className='row'>
                            <div className='col-9'>
                                <p>FAT</p>
                            </div>
                            <p> {this.state.food.fat} g</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CHOLESTEROL</p>
                            </div>
                            <p> {this.state.food.cholesterol} mg</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>SODIUM</p>
                            </div>
                            <p>{this.state.food.sodium} mg</p>
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CARBOHYDRATE</p>
                            </div>
                            <p> {this.state.food.carbohydrate} g</p>
                        </div>
                        <div className='row '>
                            <div className='col-9'>
                                <p>PROTEIN</p>
                            </div>
                            <p> {this.state.food.protein} g</p>
                        </div>
                        <div className='row price'>
                            <div className='col-9'>
                                <p>PRICE</p>
                            </div>
                            <p> {this.state.food.price} ฿</p>
                        </div>
                    </div>
                </div>
                <div className="row bottomrow">
                    <div className="col-4 bottomcol">
                        <p>{this.state.food.protein} G</p>
                        PROTEIN 
                    </div>
                    <div className="col-4 bottomcol">
                        <p>{this.state.food.calories} G</p>
                        CALORIES 
                    </div>
                    <div className="col-4 bottomcol">
                        <p> {this.state.food.carbohydrate} G</p>
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

export default connect(mapStateToProps)(MenuDetail);