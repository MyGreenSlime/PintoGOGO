const express = require('express');
const router = express.Router();

const Package = require('../models/package');
const Menu = require('../models/menu');
const Snack = require('../models/snack');

router.get('/all',function(req, res) {
    const errors = {}
    Package.find({})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/3days',function(req, res) {
    const errors = {}
    Package.find({type : 3})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/5days',function(req, res) {
    const errors = {}
    Package.find({type : 5})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/7days',function(req, res) {
    const errors = {}
    Package.find({type : 7})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.post('/add', function(req, res) {
    var package = new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal
    })
    package.save(function(err, savedPackage){
        if (err) {
            res.send(err);
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router;