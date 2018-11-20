const express = require('express');
const router = express.Router();
const passport = require('passport');

const Package = require('../models/package');
const Menu = require('../models/menu');
const Snack = require('../models/snack');
const Order =  require('../models/order')

router.get('/:id',function(req, res) {
    const errors = {}
    const package_id = req.params.id
    Package.find({_id : package_id})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/user/all',passport.authenticate('jwt',{ session : false }),function(req, res) {
    const errors = {}
    Package.find({owner : req.user.user_name})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/all',function(req, res) {
    const errors = {}
    Package.find({by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/3days',function(req, res) {
    const errors = {}
    Package.find({type : 3, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/5days',function(req, res) {
    const errors = {}
    Package.find({type : 5, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/7days',function(req, res) {
    const errors = {}
    Package.find({type : 7, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.post('/add',passport.authenticate('jwt',{ session : false }), function(req, res) {
    const error = {}
    var status = {
        ok : 1,
        message : err
    }
    var package = new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal,
        by_admin :req.user.type,
        owner : req.user.user_name
    })
    package.save(function(err, savedPackage){
        if (err) {
            error.package = err
            res.stauts(500).send(error);
        } else {
            res.sendStatus(status);
        }
    })
})
// bug**
//add package to cart anonymous
router.post('/anonymous/addcart',passport.authenticate('jwt',{ session : false }), function(req, res){
    const package_id = req.body.package_id
    const error = {}
    var status = {
        ok : 1,
        message : "add new package finish",
        data : null
    }
    
    var newPackage =  new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal
    })
    Package.findOne({_id : req.body.package_id}, function(err, package){
      if(package) {
        var isInc = true
        for(var i = 0; i < newPackage.type; i++){
            if(String(package.day_meal[i].meal_1) != String(newPackage.day_meal[i].meal_1)){
                isInc = !isInc;
                console.log(package.day_meal[i].meal_1, newPackage.day_meal[i].meal_1)
                break;
            }
            if(String(package.day_meal[i].meal_2)  != String(newPackage.day_meal[i].meal_2)){
                isInc = !isInc;
                console.log(package.day_meal[i].meal_2, newPackage.day_meal[i].meal_2)
                break;
            }
        }
        if(isInc){
            Order.updateOne({user_id : req.user.id, isfinish : false, "package_order.package_id" : req.body.package_id},{
                $inc : {"package_order.$.amount" : 1}
            }, (err, order) => {
                if(err) {
                    error.package = err
                    res.sendStatus(500).json(error)
                } else {
                    staus.message = "increase amount finish"
                    status.data = {
                        package_id : req.body.package_id
                    }
                    res.json(status)
                }
            })
        } else {
            newPackage.save()
                .then(package => {
                    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
                        const newPackageOrder = {
                            package_id : package._id,
                            package_name : package.name_package,
                            price : package.price,
                            amount : 1
                        }
                        Order.updateOne({user_id : req.user.id, isfinish : false},{
                            $push : {package_order : newPackageOrder}
                        }, (err, order) => {
                            if(err) {
                                error.package = err
                                res.sendStatus(400).json(error)
                            } else {
                                status.data = {
                                package_id : newPackageOrder.package_id
                                }
                                res.json(status)
                            }
                        })
                    })
                })
                .catch((err) => {
                    error.package = err
                    res.status(500).send(error)
                });
        }
        
      } else {
            newPackage.save()
                .then(package => {
                    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
                        const newPackageOrder = {
                            package_id : package._id,
                            package_name : package.name_package,
                            price : package.price,
                            amount : 1
                        }
                        Order.updateOne({user_id : req.user.id, isfinish : false},{
                            $push : {package_order : newPackageOrder}
                        }, (err, order) => {
                            if(err) {
                                error.package = err
                                res.sendStatus(400).json(error)
                            } else {
                                status.data = {
                                package_id : newPackageOrder.package_id
                                }
                                res.json(status)
                            }
                        })
                    })
                })
                .catch((err) => {
                    error.package = err
                    res.status(500).send(error)
                });
        }
    })

})
//delete package system
router.delete('/del/:id',passport.authenticate('jwt',{ session : false }), function(req, res) {
   const error = {};
   const query = {_id : req.params.id}
    Package.findById(req.params.id, function(err, package){
        if(err){
            error.package = err
            res.status(500).send(error);
        } else {
            if(package.owner == req.user.user_name || req.user.type){
                Package.deleteOne(query, function(err){
                    if(err){
                        error.package = err
                        res.status(500).send(error);
                    } else {
                        res.sendStatus(200);
                    }
                })
            } else {
                error.package = " Admin or Owner"
                res.json(error)
            }
        }
    })
})

module.exports = router;