const express = require('express');
const router = express.Router();
const passport = require('passport');

const Address = require('../models/address');

//get all address
router.get('/all',passport.authenticate('jwt',{ session : false }) ,function(req, res){
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
    
})

//get address made by owner
router.get('/current',passport.authenticate('jwt',{ session : false }) ,function(req, res){
    const error = {}
    Address.findOne({owner : req.user.user_name}, function(err, address){
        if(err) {
            error.address = err
            res.status(500).send(error);
        } else {
            res.send(address);
        }
    });
    
})

module.exports = router;