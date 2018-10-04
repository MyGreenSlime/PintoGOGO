const express = require('express');
const router = express.Router();

var Menu = require('../models/menu');
var Snack = require('../models/snack');

//-----------------------------------------------------food-----------------------------------------------
//find all menu
router.get('/food',function(request, response) {
    Menu.find({}, function(err, menus){
        if(err) {
            response.status(500).send({error : "Could not fetch menu"});
        } else {
            response.send(menus);
        }
    });
});
//find single menu
router.get('/food/:id',function(request, response) {
    Menu.findById(request.params.id, function(err, menu){
        if(err) {
            response.status(500).send({error : "Not found Menu"});
        } else {
            response.send(menu);
        }
    });
});
// add new menu
router.post('/food/add',function(request, response) {
    var menu = new Menu();
    menu.menu_name = request.body.menu_name,
    menu.calories = request.body.calories, 
    menu.price = request.body.price,
    menu.protein = request.body.protein,
    menu.carbohydrate = request.body.carbohydrate,
    menu.fat = request.body.fat,
    menu.img_url = request.body.img_url
    
    menu.save(function(err, savedMenu){
        if(err) {
            response.sendStatus(500);
        }else {
            response.sendStatus(200);
        }
    })
});

//---------------------------------------------------snack-------------------------------------------------
router.get('/snack',function(request, response) {
    Snack.find({}, function(err, snacks){
        if(err) {
            response.status(500).send({error : "Could not fetch snack"});
        } else {
            response.send(snacks);
        }
    });
});

router.get('/snack/:id',function(request, response) {
    Snack.findById(request.params.id, function(err, snack){
        if(err) {
            response.status(500).send({error : "Not found Snack"});
        } else {
            response.send(snack);
        }
    });
});

router.post('/snack/add',function(request, response) {
    var snack = new Snack();
    snack.snack_name = request.body.snack_name,
    snack.calories = request.body.calories, 
    snack.price = request.body.price,
    snack.protein = request.body.protein,
    snack.carbohydrate = request.body.carbohydrate,
    snack.fat = request.body.fat,
    snack.img_url = request.body.img_url
    
    snack.save(function(err, savedSnack){
        if(err) {
            response.status(500).send({status : 0});
        }else {
            response.send({status : 1});
        }
    })
});


module.exports = router;