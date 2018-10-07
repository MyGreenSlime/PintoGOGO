const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

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

module.exports = User = mongoose.model('users', UserSchema);