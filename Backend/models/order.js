var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var order = new Schema({

    user_id : {type : ObjectId, ref : "User"},
    isfinish : {type : Boolean, default : false},
    food_order : [{
        food_id : {type : ObjectId, ref : "Menu"},
        food_name : String,
        price : Number,
        amount : {type : Number, default : 1}
    }],
    snack_order : [{
        snack_id : {type : ObjectId, ref : "Snack"},
        snack_name : String,
        price : Number,
        amount : {type : Number, default : 1}
    }],
    package_order : [{
        package_id : {type : ObjectId, ref : "Package"},
        package_name : String,
        price : Number,
        amount : {type : Number, default : 1}
    }],
    totalprice : {type : Number, default : 0},
    create_time : {type : Date, default : Date.now},
    update_time : {type : Date, default : Date.now}
    
});

module.exports = mongoose.model('Order', order);