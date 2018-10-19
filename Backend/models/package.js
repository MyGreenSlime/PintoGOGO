var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var package = new Schema({

    name_package : String,
    description : String,
    type : Number,
    day_meal : [{
        meal_1 : {type : ObjectId, ref : "Menu"},

        meal_2 : {type : ObjectId, ref : "Menu"},

        snack : {type : ObjectId, ref : "Snack"}
    }],
    price : Number
    
});

module.exports = mongoose.model('Package', package);