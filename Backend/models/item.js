var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var item = new Schema({

    order_id : {type : ObjectId, ref : "Order"},
    package_id : {type : ObjectId, ref : "Package"},
    menu_id : {type : ObjectId, ref : "Menu"},
    snack_id : {type : ObjectId, ref : "Snack"},
    timestamp : Date
    
});

module.exports = mongoose.model('Item', item);