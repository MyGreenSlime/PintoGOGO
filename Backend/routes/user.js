const express = require('express');
const router = express.Router();
const bcrytpt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../config/keys');
const passport = require('passport');

//load input validation
const validationRegisterInput =  require('../validator/register');
const validationLoginInput = require('../validator/login');

const User = require('../models/User');
const Address = require('../models/address');

//register
router.post('/register', (req, res) => {
    const {errors, isValid} = validationRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({user_name : req.body.user_name})
        .then(user => {
            if(user){
                errors.user_name = 'Username already exists'
                return res.status(400).json(errors)
            } else {
                const newAddress = new Address({
                    address : req.body.address
                })
                const newUser = new User({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    user_name : req.body.user_name,
                    email : req.body.email,
                    password : req.body.password1,
                    phonenumber : req.body.phonenumber,
                    //address : address_id,
                    type : req.body.type
                })
                newAddress.save()
                    .then(address => newUser.address = address._id)
                    .catch(err => console.log(err));
                
                
                bcrytpt.genSalt(10, (err, salt) => {
                    bcrytpt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

//login
router.post('/login', function(req, res){
    const {errors, isValid} = validationLoginInput(req.body);
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const user_name = req.body.user_name;
    const password =  req.body.password;
    
    User.findOne({user_name})
    .then(user => {
        //check for user
        if(!user) {
            errors.user_name = 'User not found';
            return res.status(404).json(errors);
        }

        //check password
        bcrytpt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    //User Matched
                    //create jwt payload
                    const payload = { 
                        id: user.id, 
                        first_name: user.first_name, 
                        last_name: user.last_name, 
                        user_name: user.user_name,
                        type: user.type,
                        favorite_food : user.favorite_food,
                        favorite_snack : user.favorite_snack
                    }
                    //sign token
                    jwt.sign(payload, keys.secretOrkey, { expiresIn : 3600 }, (err, token) => {
                        res.json({
                            sucess : true,
                            token : 'Bearer ' + token
                        })
                    });
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            })
    });
})

//profile user data
router.get('/profile', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {}
    User.findById(req.user.id)
        .populate({path : "address" , model : "Address"})
        .populate({path : "favorite_food" , model : "Menu"})
        .populate({path : "favorite_snack" , model : "Snack"})
        .exec((err, user) => {
            if (err) {
                errors.profile = "Cannot Fetch Your Profile"
                res.status(400).json(errors)
            } else {
                res.json(user)
            }
        })
})

//add new address
router.put('/add/address', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    const tmpAddress = {};
    const newAddress = new Address({
        address : req.body.address
    }) 
    newAddress.save()
        .then(address => {
            tmpAddress.id = address._id
            console.log(address)
        })
        .then(() => {
            User.updateOne({_id : req.user.id}, {$push : {address : tmpAddress.id}}, (err, user) => {
            if (err) {
                errors.address = "Cannot add new address"
                res.status(400).json(errors)
            } else {
                res.json(user)
            }
        })})
        .catch(err => console.log(err));
        
})
// del some address
router.put('/del/address/:id', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    const address_id = req.params.id
    User.updateOne({_id : req.user.id}, {$pull : {address : address_id}}, (err, user) => {
        if (err) {
            errors.address = "Cannot DELETE Your address"
            res.status(400).json(errors)
        } else {
            Address.remove({_id : address_id})
                .then(console.log("Success"))
                .catch(err => {
                    console.log(err)
                })
            res.json(user)
        }
    })  
})

//add favorite food
router.put('/add/favorite/food/:id', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    var foodid =  req.params.id;
    User.updateOne({_id : req.user.id}, {$push : {favorite_food : foodid}},(err, user) => {
        if (err) {
            errors.favorite_food = "Cannot Add Your Favorite Food"
            res.status(400).json(errors)
        } else {
            res.json(user)
        }
    })
})

//delete some  favorite food
router.put('/del/favorite/food/:id', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    var foodid =  req.params.id;
    User.updateOne({_id : req.user.id},{$pull : {favorite_food : foodid}},(err, user) => {
        if (err) {
            errors.favorite_food = "Cannot DELETE Your Favorite Food"
            res.status(400).json(errors)
        } else {
            res.json(user)
        }
    })
})

//add favorite snack
router.put('/add/favorite/snack/:id', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    var snackid =  req.params.id;
    User.updateOne({_id : req.user.id},{$push : {favorite_snack : snackid}},(err, user) => {
        if (err) {
            errors.favorite_snack = "Cannot Add Your Favorite Snack"
            res.status(400).json(errors)
        } else {
            res.json(user)
        }
    })
})

//delete some  favorite snack
router.put('/del/favorite/snack/:id', passport.authenticate('jwt',{ session : false }), (req, res) => {
    const errors = {};
    var snackid =  req.params.id;
    User.updateOne({_id : req.user.id},{$pull : {favorite_snack : snackid}},(err, user) => {
        if (err) {
            errors.favorite_snack = "Cannot DELETE Your Favorite Snack"
            res.status(400).json(errors)
        } else {
            res.json(user)
        }
    })
})

module.exports = router;