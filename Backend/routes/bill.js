const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order =  require('../models/order');
const Bill = require('../models/bill');

const billControl = require('../controllers/bill_control');
//get all bill
router.get('/all', passport.authenticate('jwt',{ session : false }), billControl.getAllBill);

//get current bill
router.get('/current',  passport.authenticate('jwt',{ session : false }), billControl.getCurrentBill);

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
            error.bills = err
            res.status(500).json(error)
        } else {
            var status = {
                ok : 1,
                message : "update bill finish"
            }
            res.json(status)
        }
    })
})


module.exports = router;