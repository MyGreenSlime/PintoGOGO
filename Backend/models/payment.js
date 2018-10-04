var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var payment = new Schema({

    card_number : String,
    card_status : Boolean
    
});

module.exports = mongoose.model('Payment', payment);