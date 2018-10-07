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
router.post('/register',function(request, response){
    const {errors, isValid} = validationRegisterInput(request.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({user_name : request.body.user_name})
        .then(user => {
            if(user){
                errors.user_name = 'Username already exists'
                return response.status(400).json(errors)
            } else {
                const newUser = new User({
                    first_name : request.body.first_name,
                    last_name : request.body.last_name,
                    user_name : request.body.user_name,
                    email : request.body.email,
                    password : request.body.password1,
                    phonenumber : request.body.phonenumber,
                    address : request.body.address
                })
                bcrytpt.genSalt(10, (err, salt) => {
                    bcrytpt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => response.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

//login
router.post('/login', function(request, response){
    const {errors, isValid} = validationLoginInput(request.body);
    //check validation
    if(!isValid) {
        return response.status(400).json(errors);
    }
    const user_name = request.body.user_name;
    const password =  request.body.password;
    
    User.findOne({user_name})
    .then(user => {
        //check for user
        if(!user) {
            errors.user_name = 'User not found';
            return response.status(404).json(errors);
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
                        response.json({
                            sucess : true,
                            token : 'Bearer ' + token
                        })
                    });
                } else {
                    errors.password = 'Password incorrect';
                    return response.status(400).json(errors);
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