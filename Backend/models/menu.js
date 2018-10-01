var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = new Schema({
    menu_name : String,
    calories : Number, 
    price : Number,
    protein : Number,
    carbohydrate : Number,
    fat : Number,
    img_url : String
});

module.exports = mongoose.model('Menu', menu);