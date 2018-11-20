var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var address = new Schema({
    address : String,
    lat : String,
    lng : String,
    distance : Number,
    delivery_fee : Number,
    owner : {type : String, ref : 'users'}
});

module.exports = mongoose.model('Address', address);