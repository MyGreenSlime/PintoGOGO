var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var user = new Schema({
    type : {type: String, default: "user"},
    first_name : String,
    last_name : String,
    email : String,
    user_name : String,
    password : String,
    //address_id :String,
    address : [],
    phonenumber : String,
    //payment : [{type : ObjectId, ref : 'Payment', default:}]
});

module.exports = mongoose.model('User', user);