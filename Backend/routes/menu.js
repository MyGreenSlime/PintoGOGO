const express = require('express');
const router = express.Router();

const Menu = require('../models/menu');
const Snack = require('../models/snack');

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
    menu.description = request.body.description,
    menu.cholesterol =  request.body.cholesterol,
    menu.sodium  = request.body.sodium,
    menu.img_url = request.body.img_url
    
    menu.save(function(err, savedMenu){
        if(err) {
            response.sendStatus(500);
        }else {
            response.sendStatus(200);
        }
    })
});

//delete menu for admin
router.delete('/food/del/:id',function(req, res){
    let query = {_id:req.params.id}

    Menu.findById(req.params.id, function(err, menu){
        if(err){
            res.status(500).send(err);
        }else{
            Menu.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            })
        }
    })   
})

//---------------------------------------------------snack-------------------------------------------------

//find all menu
router.get('/snack',function(request, response) {
    Snack.find({}, function(err, snacks){
        if(err) {
            response.status(500).send({error : "Could not fetch snack"});
        } else {
            response.send(snacks);
        }
    });
});

//find single menu
router.get('/snack/:id',function(request, response) {
    Snack.findById(request.params.id, function(err, snack){
        if(err) {
            response.status(500).send({error : "Not found Snack"});
        } else {
            response.send(snack);
        }
    });
});

//add new snack
router.post('/snack/add',function(request, response) {
    var snack = new Snack();
    snack.snack_name = request.body.snack_name,
    snack.calories = request.body.calories, 
    snack.price = request.body.price,
    snack.protein = request.body.protein,
    snack.carbohydrate = request.body.carbohydrate,
    snack.fat = request.body.fat,
    snack.description = request.body.description,
    snack.cholesterol = request.body.cholesterol,
    snack.sodium = request.body.sodium,
    snack.img_url = request.body.img_url
    
    snack.save(function(err, savedSnack){
        if(err) {
            response.sendStatus(500);
        }else {
            response.sendStatus(200);
        }
    })
});

//delete snack for admin
router.delete('/snack/del/:id',function(req, res){
    let query = {_id:req.params.id}

    Snack.findById(req.params.id, function(err, snack){
        if(err){
            res.status(500).send(err);
        }else{
            Snack.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            })
        }
    })   
})

module.exports = router;