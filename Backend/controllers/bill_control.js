const Order = require('../models/order');
const Bill = require('../models/bill');

exports.getAllBill = (req, res) => {
    const error = {}
    if (!req.user.type) {
        error.admin = "need admin account"
        res.status(500).send(error)
    }
    Bill.find({})
        .sort({ "update_time": -1 })
        .populate({
            path: "order",
            model: "Order"
        })
        .exec((err, bill) => {
            if (err) {
                error.bills = err
                res.status(500).send(err)
            } else {
                res.json(bill)
            }
        })
}

exports.getCurrentBill = (req, res) => {
    const error = {}
    Bill.findOne({
            user: req.user.id,
            isfinish: false
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
}

exports.updateBill = (req, res) => {
    const error = {}
    const newUpdate = {
        destination: req.body.destination,
        delivery_fee: req.body.delivery_fee,
        distance: req.body.distance,
        total_cost: req.body.total_cost
    }
    Bill.updateOne({
        user: req.user.id,
        isfinish: false
    }, {
        $set: {
            destination: newUpdate.destination,
            delivery_fee: newUpdate.delivery_fee,
            distance: newUpdate.distance,
            total_cost: newUpdate.total_cost
        }
    }, (err, bill) => {
        if (err) {
            error.bills = err
            res.status(500).json(error)
        } else {
            var status = {
                ok: 1,
                message: "update bill finish"
            }
            res.json(status)
        }
    })
}

exports.historyPurchase = (req, res) => {
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
}

exports.toDoList = (req,res) => {
    const error = {}
    if(!req.user.type) {
        error.admin = "need admin account"
        res.status(500).send(error)
    }
    var today = new Date(new Date().setUTCHours(0,0,0,0))
    var tomorrow = new Date(new Date().setUTCHours(0,0,0,0))
    tomorrow.setDate(new Date().getDate()+1)
    console.log("today",today)
    console.log("tomorrow",tomorrow)
    Bill.find({
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
}