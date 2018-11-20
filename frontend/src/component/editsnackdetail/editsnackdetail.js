import React, { Component} from 'react';
import axios from 'axios'
import "../editmenudetail/editmenudetail.css";
class EditSnackDetail extends Component {
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
            img : null,
            description : "",
            sodium : "",
            cholesterol : "",
            status: 0,
            file: "",
            imagePreviewUrl: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleChangeImage(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        this.setState({
            img : e.target.files[0]
        },() => {
            console.log(this.state.img)
        })

        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
      
        reader.readAsDataURL(file)
    }
    
    handleSubmit(e) {
        const formData = new FormData()
       formData.append('img',this.state.img, this.state.img.name)
       formData.append('img_url',this.state.food.img_url)
       formData.append('menu_name',this.state.menu_name)
       formData.append('calories',this.state.calories)
       formData.append('price',this.state.price)
       formData.append('protein',this.state.protein)
       formData.append('carbohydrate',this.state.carbohydrate)
       formData.append('fat',this.state.fat)
       formData.append('cholesterol',this.state.cholesterol)
       formData.append('sodium',this.state.sodium)
       formData.append('description',this.state.description)
        axios.post('/api/menus/snack/edit/'+this.state.food._id, formData)
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
        axios.get("/api/menus/snack/" + res[res.length-1])
        .then(response => {
            this.setState({
              food: response.data
            });
        }).then(() => {
            this.setState({
                imagePreviewUrl : "\\"+this.state.food.img_url
            })
        })
    }

    componentDidMount() {
        this.findIdFromUrl();
    }

    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="imgpreview"/>);
        }
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
                    <input type="text" name="menu_name"className="form-control" placeholder={this.state.food.menu_name} 
                    value={this.state.menu_name} onChange={this.handleChange} style={{width: "50%"}} required />
                    </div>
                </div>
                <div className="line" />

                <div className="row menudetail">
                    <div className="col-5">
                        {$imagePreview}
                        {/* <img src={"\\"+this.state.food.img_url} width="80%" className="foodimg" /> */}
                        <input type="file" name="img" className="form-control" 
                            onChange={this.handleChangeImage} style={{width: "100%"}} />
                        <div className="row justify-content-center">
                            <button type="submit" value="submit" className="addtocartbutton">SAVE CHANGE</button>
                        </div>
                    </div>

                    
                    <div className="col">
                        <div className="row descript">
                            <textarea type="text" name="description" className="form-control" placeholder={this.state.food.description}
                            value={this.state.description} onChange={this.handleChange}/>
                        </div>
                        <div className='row'>
                            <div className='col-9 cal'>
                                <p>CALORIES</p>
                            </div>
                            <input type="text" name="calories" className="form-control" placeholder={this.state.food.calories+" Kcal"} 
                            value={this.state.calories} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className="row line" /> 
                        <div className='row'>
                            <div className='col-9'>
                                <p>FAT</p>
                            </div>
                            <input type="text" name="fat" className="form-control" placeholder={this.state.food.fat+" mg"} 
                            value={this.state.fat} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CHOLESTEROL</p>
                            </div>
                            <input type="text" name="cholesterol" className="form-control" placeholder={this.state.food.cholesterol+" g"} 
                            value={this.state.cholesterol} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>SODIUM</p>
                            </div>
                            <input type="text" name="sodium" className="form-control" placeholder={this.state.food.sodium+" mg"} 
                            value={this.state.sodium} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>CARBOHYDRATE</p>
                            </div>
                            <input type="text" name="carbohydrate" className="form-control" placeholder={this.state.food.carbohydrate+" g"} 
                            value={this.state.carbohydrate} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className='row '>
                            <div className='col-9'>
                                <p>PROTEIN</p>
                            </div>
                            <input type="text" name="protein" className="form-control" placeholder={this.state.food.protein+" g"} 
                            value={this.state.protein} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                        <div className='row'>
                            <div className='col-9'>
                                <p>PRICE</p>
                            </div>
                            <input type="text" name="price" className="form-control" placeholder={this.state.food.price+" ฿"} 
                            value={this.state.price} onChange={this.handleChange} style={{width: "20%"}} />
                        </div>
                    </div>
                </div>
            </form>
                
        </div>
        </React.Fragment>
    }
}

export default EditSnackDetail;