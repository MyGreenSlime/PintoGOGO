var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var order = new Schema({

    user_id : {type : ObjectId, ref : "User"},
    totalprice : Number
    
});

module.exports = mongoose.model('Order', order);