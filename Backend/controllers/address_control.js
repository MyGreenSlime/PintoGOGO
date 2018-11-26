const Address = require('../models/address');

exports.getAllAddress = (req, res) => {
    const error = {}
    if(!req.user.type){
        error.admin = "need admin"
        res.status(500).send(error)
    }
    Address.find({}, function(err, address){
        if(err) {
            error.address = err
            res.status(500).send(error);
        } else {
            res.send(address);
        }
    });
}

exports.getCurrentAddress = (req, res) => {
    const error = {}
    Address.find({owner : req.user.user_name}, function(err, address){
        if(err) {
            error.address = err
            res.status(500).send(error);
        } else {
            res.send(address);
        }
    });
}