const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order =  require('../models/order');
const Menu = require('../models/menu');
const Snack = require('../models/snack');

//get all order
router.get('/all',function(req, res) {
    Order.find({}, function(err, orders){
        if(err) {
            res.status(500).send({error : "Could not fetch orders"});
        } else {
            res.send(orders);
        }
    });
});
//get order by id

//get order by date

//get order by finish

//get order by unfinish

//add food to order
router.put('/add/food', passport.authenticate('jwt',{ session : false }), function(req, res){

    const newfood_order = {
        food_id : req.body.food_id,
        food_name : req.body.food_name,
        price : req.body.price,
        amount : 1
    }
    const error = {}
    console.log(req.user.id)
    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
        if(order) {
          Order.updateOne({user_id : req.user.id, isfinish : false , "food_order.food_id" : req.body.food_id},{
              $inc : { "food_order.$.amount" : 1 }
          }, (err, order) => {
              if(err) {
                  error.addamount = "can not add amount"
                  res.sendStatus(400).json(error);
              } else {
                 if(order.nModified == 0) {
                    Order.updateOne({user_id : req.user.id, isfinish : false},{
                        $push : {food_order : newfood_order}
                    }, (err, order) => {
                        if(err) {
                            error.addneworder = "can not add new menu to order"
                            res.sendStatus(400).json(error)
                        } else {
                            res.json(order)
                        }
                    })
                 } else {
                     res.json(order)
                 }
              }
          })
        } else {
            const newOrder =  new Order({
                user_id : req.user.id,
                food_order : newfood_order
            });
            newOrder.save()
                .then(order => res.json(order))
                .catch(err => console.log(err));
        }
    })
})

//add snack to order
router.put('/add/snack', passport.authenticate('jwt',{ session : false }), function(req, res){

    const newsnack_order = {
        snack_id : req.body.snack_id,
        snack_name : req.body.snack_name,
        price : req.body.price,
        amount : 1
    }
    const error = {}
    console.log(req.user.id)
    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
        if(order) {
          Order.updateOne({user_id : req.user.id, isfinish : false , "snack_order.snack_id" : req.body.snack_id},{
              $inc : { "snack_order.$.amount" : 1 }
          }, (err, order) => {
              if(err) {
                  error.addamount = "can not add amount"
                  res.sendStatus(400).json(error);
              } else {

                 if(order.nModified == 0) {
                    Order.updateOne({user_id : req.user.id, isfinish : false},{
                        $push : {snack_order : newsnack_order}
                    }, (err, order) => {
                        if(err) {
                            error.addneworder = "can not add new menu to order"
                            res.sendStatus(400).json(error)
                        } else {
                            res.json(order)
                        }
                    })
                 } else {
                     res.json(order)
                 }
              }
          })
        } else {
            const newOrder =  new Order({
                user_id : req.user.id,
                snack_order : newsnack_order
            });
            newOrder.save()
                .then(order => res.json(order))
                .catch(err => console.log(err));
        }
    })
})
//add package to order
router.put('/add/package', passport.authenticate('jwt',{ session : false }), function(req, res){

    const newpackage_order = {
        package_id : req.body.package_id,
        package_name : req.body.package_name,
        price : req.body.price,
        amount : 1
    }
    const error = {}
    console.log(req.user.id)
    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
        if(order) {
          Order.updateOne({user_id : req.user.id, isfinish : false , "package_order.package_id" : req.body.package_id},{
              $inc : { "package_order.$.amount" : 1 }
          }, (err, order) => {
              if(err) {
                  error.addamount = "can not add amount"
                  res.sendStatus(400).json(error);
              } else {
                 if(order.nModified == 0) {
                    Order.updateOne({user_id : req.user.id, isfinish : false},{
                        $push : {package_order : newpackage_order}
                    }, (err, order) => {
                        if(err) {
                            error.addneworder = "can not add new menu to order"
                            res.sendStatus(400).json(error)
                        } else {
                            res.json(order)
                        }
                    })
                 } else {
                     res.json(order)
                 }
              }
          })
        } else {
            const newOrder =  new Order({
                user_id : req.user.id,
                package_order : newpackage_order
            });
            newOrder.save()
                .then(order => res.json(order))
                .catch(err => console.log(err));
        }
    })
})
//increase amount food
router.put('/increase/amount/food/:id',passport.authenticate('jwt',{ session : false }), function(req, res){
    const food_id = req.params.id
    Order.updateOne({user_id : req.user.id, isfinish : false , "food_order.food_id" : food_id},{
        $inc : { "food_order.$.amount" : 1 }
    }, (err, order) => {
        if(err) {
            error.addamount = "can not add amount"
            res.sendStatus(400).json(error);
        } else {
            res.json(order)
        }
    })
})
//increase amount snack
router.put('/increase/amount/snack/:id',passport.authenticate('jwt',{ session : false }), function(req, res){
    const snack_id = req.params.id
    Order.updateOne({user_id : req.user.id, isfinish : false , "snack_order.snack_id" : snack_id},{
        $inc : { "snack_order.$.amount" : 1 }
    }, (err, order) => {
        if(err) {
            error.addamount = "can not add amount"
            res.sendStatus(400).json(error);
        } else {
            res.json(order)
        }
    })
})
//increase amount package
router.put('/increase/amount/package/:id',passport.authenticate('jwt',{ session : false }), function(req, res){
    const package_id = req.params.id
    Order.updateOne({user_id : req.user.id, isfinish : false , "package_order.package_id" : package_id},{
        $inc : { "package_order.$.amount" : 1 }
    }, (err, order) => {
        if(err) {
            error.addamount = "can not add amount"
            res.sendStatus(400).json(error);
        } else {
            res.json(order)
        }
    })
})
//del food from order

//del snack from order

//del package from order

//checkout

module.exports = router;