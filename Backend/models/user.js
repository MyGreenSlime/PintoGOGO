var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    type : String,
    first_name : String,
    last_name : String,
    email : String,
    user_name : String,
    password : String,
    address_id : [{type: ObjectId, ref : 'Address'}],
    phonenumber : String,
    payment : [{type : ObjectId, ref : 'Payment'}]
});

module.exports = mongoose.model('User', user);