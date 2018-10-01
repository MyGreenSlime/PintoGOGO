var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address = new Schema({
    house_no : String,
    Lane : String,
    road : String,
    subdistrict : String,
    district : String,
    province : String,
    addition : String,
    zipcode : String
});

module.exports = mongoose.model('Address', address);