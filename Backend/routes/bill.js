const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order = require('../models/order');
const Bill = require('../models/bill');

const billControl = require('../controllers/bill_control');
//get all bill
router.get('/all', passport.authenticate('jwt',{ session : false }), billControl.getAllBill);

//get current bill
router.get('/current',  passport.authenticate('jwt',{ session : false }), billControl.getCurrentBill);

router.get('/historypurchase', passport.authenticate('jwt', {session : false}), (req, res) => {
    const error = {}
    Bill.find({
        user : req.user.id,
        isfinish : true
    })
    .sort({ "update_time": -1 })
    .populate({
        path: "order",
        model : "Order"
    })
    .populate({
        path : "order",
        populate : {
            path: "package_order.package_id",
            model: "Package"
        }
    })
    .exec((err, bill) => {
        if (err) {
            error.bills = err
            res.status(500).json(error)
        } else {
            res.json(bill)
        }
    })
})

router.get('/todolist',  passport.authenticate('jwt',{ session : false }), (req, res) => {
    const error = {}
    var today = new Date(new Date().setUTCHours(0,0,0,0))
    var tomorrow = new Date(new Date().setUTCHours(0,0,0,0))
    tomorrow.setDate(new Date().getDate()+1)
    console.log("today",today)
    console.log("tomorrow",tomorrow)
    Bill.find({
        user : req.user.id,
        isfinish : true,
        update_time : {
            $gte : today ,
            $lte : tomorrow
        }
    })
    .populate({
        path: "order",
        model : "Order"
    })
    .populate({
        path : "order",
        populate : {
            path: "package_order.package_id",
            model: "Package"
        }
    })
    .exec((err, bill) => {
        if (err) {
            error.bills = err
            res.status(500).json(error)
        } else {
            res.json(bill)
        }
    })
})


//update bill
router.put('/update/current', passport.authenticate('jwt',{ session : false }), billControl.updateBill);


module.exports = router;