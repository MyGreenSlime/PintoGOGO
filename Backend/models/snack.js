var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var snack = new Schema({

    snack_name : String,
    calories : Number, 
    price : Number,
    protein : Number,
    carbohydrate : Number,
    fat : Number,
    description : String,
    cholesterol : String,
    sodium : String,
    img_url : String
    
});

module.exports = mongoose.model('Snack', snack);