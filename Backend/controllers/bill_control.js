const Order =  require('../models/order');
const Bill = require('../models/bill');

exports.getAllBill = (req, res) => {
    const error = {}
    if(!req.user.type) {
        error.admin = "need admin account"
        res.status(500).send(error)
    }
    Bill.find({})
        .populate({path : "order", model : "Order" })
        .exec((err, bill) => {
            if(err) {
                error.bills = err
                res.status(500).send(err)
            } else {
                res.json(bill)
            }
        })       
}

exports.getCurrentBill = (req, res) => {
    const error = {}
    Bill.findOne({user : req.user.id, isfinish : false})
        .populate({path : "order", model : "Order" })
        .exec((err, bill) => {
            if(err) {
                error.bills = err
                res.status(500).json(error)
            } else {
                res.json(bill)
            }
        })
}