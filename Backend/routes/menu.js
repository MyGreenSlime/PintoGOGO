const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const storageFood = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null,'./public/uploads/upload_food/');
    },
    filename : function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);

    }
});

const storageSnack = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null,'./public/uploads/upload_snack/');
    },
    filename : function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);

    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const uploadFood = multer({
   storage : storageFood,
   limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

const uploadSnack = multer({
    storage : storageSnack,
    limits: {
     fileSize: 1024 * 1024 * 10
   },
   fileFilter: fileFilter
 });


const Menu = require('../models/menu');
const Snack = require('../models/snack');

//-----------------------------------------------------food-----------------------------------------------
//find all menu
router.get('/food',function(req, res) {
    Menu.find({}, function(err, menus){
        if(err) {
            res.status(500).send({error : "Could not fetch menu"});
        } else {
            res.send(menus);
        }
    });
});
//find single menu
router.get('/food/:id',function(req, res) {
    Menu.findById(req.params.id, function(err, menu){
        if(err) {
            res.status(500).send({error : "Not found Menu"});
        } else {
            res.send(menu);
        }
    });
});
// add new menu
router.post('/food/add',passport.authenticate('jwt',{ session : false }),uploadFood.single('img'), function(req, res) {
    const error = {};
    if(!req.user.type){
        error.admin = "need admin account"
        res.status(404).json(error)
    }
    var menu = new Menu();
    menu.menu_name = req.body.menu_name
    menu.calories = req.body.calories
    menu.price = req.body.price
    menu.protein = req.body.protein
    menu.carbohydrate = req.body.carbohydrate
    menu.fat = req.body.fat
    menu.description = req.body.description
    menu.cholesterol =  req.body.cholesterol
    menu.sodium  = req.body.sodium
    menu.img_url = req.file.path
    
    menu.save(function(err, savedMenu){
        if(err) {
            res.sendStatus(500);
        }else {
            res.sendStatus(200);
        }
    })
});

//edit menu fro admin
router.put('/food/edit/:id',passport.authenticate('jwt',{ session : false }),uploadFood.single('img'),function(req, res){
    const error = {};
    if(!req.user.type) {
        error.admin =  "need admin account"
        res.status(500).send(error)
    }
    const menuEdit = {
        menu_name : req.body.menu_name,
        calories : req.body.calories,
        price : req.body.price,
        protein : req.body.protein,
        carbohydrate : req.body.carbohydrate,
        fat : req.body.fat,
        description : req.body.description,
        cholesterol :  req.body.cholesterol,
        sodium  : req.body.sodium,
        img_url : req.body.img_url
    }
    if(req.file) {
        menuEdit.img_url = req.file.path
    }
    Menu.updateOne({_id : req.params.id},{
        $set : {
            menu_name : menuEdit.menu_name,
            calories : menuEdit.calories,
            price : menuEdit.price,
            protein : menuEdit.protein,
            carbohydrate : menuEdit.carbohydrate,
            fat : menuEdit.fat,
            description : menuEdit.description,
            cholesterol : menuEdit.cholesterol,
            sodium : menuEdit.sodium,
            img_url : menuEdit.img_url
        }
    },(err, menu) => {
        if(err) {
            error.edit = "cannot edit menu"
            res.sendStatus(500).json(error)
        } else {
            res.json(menu) 
        }
    })
})

//delete menu for admin
router.delete('/food/del/:id',passport.authenticate('jwt',{ session : false }),function(req, res){
    const error = {};
    if(!req.user.type){
        error.admin = "need admin account"
        res.status(404).json(error)
    }
    let query = {_id:req.params.id}

    Menu.findById(req.params.id, function(err, menu){
        if(err){
            res.status(500).send(err);
        }else{
            Menu.remove(query, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })   
})

//---------------------------------------------------snack-------------------------------------------------

//find all menu
router.get('/snack',function(req, res) {
    Snack.find({}, function(err, snacks){
        if(err) {
            res.status(500).send({error : "Could not fetch snack"});
        } else {
            res.send(snacks);
        }
    });
});

//find single menu
router.get('/snack/:id',function(req, res) {
    Snack.findById(req.params.id, function(err, snack){
        if(err) {
            res.status(500).send({error : "Not found Snack"});
        } else {
            res.send(snack);
        }
    });
});

//add new snack
router.post('/snack/add',passport.authenticate('jwt',{ session : false }), uploadSnack.single('img') ,function(req, res) {
    const error = {};
    if(!req.user.type){
        error.admin = "need admin account"
        res.status(404).json(error)
    }
    var snack = new Snack();
    snack.snack_name = req.body.snack_name,
    snack.calories = req.body.calories, 
    snack.price = req.body.price,
    snack.protein = req.body.protein,
    snack.carbohydrate = req.body.carbohydrate,
    snack.fat = req.body.fat,
    snack.description = req.body.description,
    snack.cholesterol = req.body.cholesterol,
    snack.sodium = req.body.sodium,
    snack.img_url = req.file.path
    
    snack.save(function(err, savedSnack){
        if(err) {
            res.sendStatus(500);
        }else {
            res.sendStatus(200);
        }
    })
});

//edit snack from admin
router.put('/snack/edit/:id',passport.authenticate('jwt',{ session : false }),uploadSnack.single('img'),function(req, res){
    const error = {};
    if(!req.user.type) {
        error.admin =  "need admin account"
        res.status(500).send(error)
    }
    const snackEdit = {
        snack_name : req.body.snack_name,
        calories : req.body.calories,
        price : req.body.price,
        protein : req.body.protein,
        carbohydrate : req.body.carbohydrate,
        fat : req.body.fat,
        description : req.body.description,
        cholesterol :  req.body.cholesterol,
        sodium  : req.body.sodium,
        img_url : req.body.img_url
    }
    if(req.file) {
        snackEdit.img_url = req.file.path
    }
    Snack.updateOne({_id : req.params.id},{
        $set : {
            snack_name : snackEdit.snack_name,
            calories : snackEdit.calories,
            price : snackEdit.price,
            protein : snackEdit.protein,
            carbohydrate : snackEdit.carbohydrate,
            fat : snackEdit.fat,
            description : snackEdit.description,
            cholesterol : snackEdit.cholesterol,
            sodium : snackEdit.sodium,
            img_url : snackEdit.img_url
        }
    },(err, snack) => {
        if(err) {
            error.edit = "cannot edit snack"
            res.sendStatus(500).json(error)
        } else {
            res.json(snack) 
        }
    })
})


//delete snack for admin
router.delete('/snack/del/:id',passport.authenticate('jwt',{ session : false }) ,function(req, res){
    const error = {};
    if(!req.user.type){
        error.admin = "need admin account"
        res.status(404).json(error)
    }
    let query = {_id:req.params.id}

    Snack.findById(req.params.id, function(err, snack){
        if(err){
            res.status(500).send(err);
        }else{
            Snack.remove(query, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })   
})

module.exports = router;