var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId

var bill = new Schema({
    order : {type : ObjectId, ref : "Order"},
    user : {type : ObjectId, ref : "users"},
    isfinish : {type : Boolean, default : false},
    destination : String,
    order_cost :{type : Number, default : 0},
    total_cost : Number,
    distance : Number,
    delivery_fee : Number,
    create_time : {type : Date, default : Date.now},
    update_time : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Bill', bill);