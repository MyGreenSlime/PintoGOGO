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
                const newUser = new User({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    user_name : req.body.user_name,
                    email : req.body.email,
                    password : req.body.password1,
                    phonenumber : req.body.phonenumber,
                    address : req.body.address,
                    type : req.body.type
                })
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
                        type: user.type
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

router.get('/current', passport.authenticate('jwt',{ session : false }), (req,res) => {
    res.json({
        id : req.user.id,
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        user_name : req.user.user_name,
        type : req.user.type
    })
})



module.exports = router;