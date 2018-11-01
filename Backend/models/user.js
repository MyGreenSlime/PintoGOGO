const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new Schema({

    type : {type: Boolean, default: false},
    first_name : String,
    last_name : String,
    email : String,
    user_name : String,
    password : String,
    address : [{type : ObjectId, ref : "Address"}],
    phonenumber : String,
    favorite_food : [{type : ObjectId, ref : "Menu"}],
    favorite_snack : [{type : ObjectId, ref : "Snack"}],
    history_purchase : [{type : ObjectId, ref : "Order"}]
    //payment : [{type : ObjectId, ref : 'Payment', default:}]
    
});

module.exports = User = mongoose.model('users', UserSchema);