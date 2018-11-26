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
router.put('/update/current', passport.authenticate('jwt',{ session : false }), billControl.updateBill);


module.exports = router;