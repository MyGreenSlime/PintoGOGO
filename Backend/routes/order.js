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

    Order.findOne({user_id : req.user.user_id, isfinish : false}, function(err, order){
        if(order) {
           Order.updateOne({})
        } else {
            const newOrder =  new Order({
                user_id : req.user.user_id,
                food_order : newfood_order
            });
            newOrder.save()
                .then(order => res.json(order))
                .catch(err => console.log(err));
        }
    })
})

//add snack to order

//add package to order

//update amount food

//update amount snack

//update amount package

//del food from order

//del snack from order

//del package from order

//checkout

module.exports = router;