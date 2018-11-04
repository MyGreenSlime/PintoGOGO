import React, { Component} from 'react';
import axios from 'axios'
class EditMenuDetail extends Component {
    constructor(props){
        super(props);
        this.findIdFromUrl = this.findIdFromUrl.bind(this)
        this.state={
            food: {},
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
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    findIdFromUrl(){
        var url = window.location.href;
        var res = url.split("/");
        axios.get("http://localhost:4000/menus/food/" + res[res.length-1])
        .then(response => {
            this.setState({
              food: response.data
            });
        })
    }

    componentDidMount() {
        this.findIdFromUrl();
    }

    render(){
        return <React.Fragment>
        <div className="all">
                <div className="row outside">
                    <div className="col-3 homebutton">
                        <img src="/img/other/left-arrow.png" height="20px" />
                        <a href="/">
                            BACK TO HOMEPAGE
                        </a>
                        
                    </div>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className ="row">
                        <div className="col menuname">
                        <input type="text" className="form-control" placeholder={this.state.food.menu_name} 
                        value={this.state.menu_name} onChange={this.handleChange} style={{width: "50%"}} />
                        </div>
                    </div>
                    <div className="line" />

                    <div className="row menudetail">
                        <div className="col-5">
                            <img src={this.state.food.img_url} width="80%" className="foodimg" />
                            <input type="text" className="form-control" placeholder={this.state.food.img_url} 
                            value={this.state.img_url} onChange={this.handleChange} style={{width: "100%"}} />
                            <div className="row justify-content-center">
                                <button type="submit" value="submit" className="addtocartbutton">SAVE CHANGE</button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row descript">
                                <textarea type="text" className="form-control" placeholder={this.state.food.description}
                                value={this.state.description} onChange={this.handleChange}/>
                            </div>
                            <div className='row'>
                                <div className='col-9 cal'>
                                    <p>CALORIES</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.calories+" Kcal"} 
                                value={this.state.calories} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className="row line" /> 
                            <div className='row'>
                                <div className='col-9'>
                                    <p>FAT</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.fat+" mg"} 
                                value={this.state.fat} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    <p>CHOLESTEROL</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.cholesterol+" g"} 
                                value={this.state.cholesterol} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    <p>SODIUM</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.sodium+" mg"} 
                                value={this.state.sodium} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    <p>CARBOHYDRATE</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.carbohydrate+" g"} 
                                value={this.state.carbohydrate} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className='row '>
                                <div className='col-9'>
                                    <p>PROTEIN</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.protein+" g"} 
                                value={this.state.protein} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    <p>PRICE</p>
                                </div>
                                <input type="text" className="form-control" placeholder={this.state.food.price+" ฿"} 
                                value={this.state.price} onChange={this.handleChange} style={{width: "20%"}} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 bottomrow">
                            <p>{this.state.food.protein} G</p>
                            PROTEIN 
                        </div>
                        <div className="col-4 bottomrow">
                            <p>{this.state.food.calories} G</p>
                            CALORIES 
                        </div>
                        <div className="col-4 bottomrow">
                            <p> {this.state.food.carbohydrate} G</p>
                            CARBOHYDRATE 
                        </div>
                    </div>
                </form>
                
            </div>
        </React.Fragment>
    }
}

export default EditMenuDetail;