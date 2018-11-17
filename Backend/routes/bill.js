const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order =  require('../models/order');
const Bill = require('../models/bill');

//get all bill
router.get('/all', passport.authenticate('jwt',{ session : false }),function(req, res) {
    const error = {}
    if(!req.user.type) {
        error.admin = "need admin account"
        res.status(500).send(error)
    }
    Bill.find({})
        .populate({path : "order", model : "Order" })
        .exec((err, bill) => {
            if(err) {
                error.bills = "Could not fetch all bills"
                res.status(500).send(err)
            } else {
                res.json(bill)
            }
        })       
});

//get current bill
router.get('/current',  passport.authenticate('jwt',{ session : false }), function(req, res){
    const error = {}
    Bill.findOne({user : req.user.id, isfinish : false})
        .populate({path : "order", model : "Order" })
        .exec((err, bill) => {
            if(err) {
                error.bills = "Could not fetch curr bills"
                res.status(500).json(error)
            } else {
                res.json(bill)
            }
        })
});

//update bill
router.put('/update/current', passport.authenticate('jwt',{ session : false }), function(req, res){
    const error = {}
    const newUpdate = {
        destination : req.body.destination,
        delivery_fee : req.body.delivery_fee,
        distance : req.body.distance,
        total_cost : req.body.total_cost
    }
    Bill.updateOne({user : req.user.id, isfinish : false},{
        $set : {
            destination : newUpdate.destination,
            delivery_fee : newUpdate.delivery_fee,
            distance : newUpdate.distance,
            total_cost : newUpdate.total_cost
        }
    }, (err, bill) => {
        if(err) {
            error.updatebill = "cannot update bill"
            res.status(500).json(error)
        } else {
            res.json(bill)
        }
    })
})


module.exports = router;