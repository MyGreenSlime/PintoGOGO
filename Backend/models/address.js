var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address = new Schema({
    address : String
});

module.exports = mongoose.model('Address', address);