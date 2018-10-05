const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const jwt = require('jsonwebtoken')

var User = require('../models/user');
//show profile
router.get('/:id', function(request, response){
    User.findById(request.params.id, function(err, profile){
        if(err) {
            response.status(500).send({error : "Not found Menu"});
        } else {
            response.send(profile);
        }
    });
})

//register
router.post('/register',function(request, response){
    request.checkBody('first_name',"First name is required").notEmpty()
    request.checkBody('last_name',"Last name is required").notEmpty()
    request.checkBody('email',"Email is required").notEmpty()
    request.checkBody('email',"This is not email").isEmail()
    request.checkBody('user_name',"Username is required").notEmpty()
    request.checkBody('password1',"Password is required").notEmpty() 
    request.checkBody('password2',"Wrong Password").equals(request.body.password1)
    request.checkBody('address', "Address is required").notEmpty()
    request.checkBody('phonenumber', "Phonenumber is required").notEmpty()
    let error = request.validationErrors()
    
    if(error) {
        response.send(error)
    } else {
        var {first_name, last_name, email, user_name, address, password1,phonenumber} = request.body;
        var newUser = new User({
            first_name : first_name,
            last_name : last_name,
            email : email,
            user_name : user_name,
            address : address,
            phonenumber : phonenumber,
            password : password1
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err) {
                    res.send(err);
                }
                newUser.password = hash
                newUser.save(function(err,newUser){
                    if(err){
                        response.sendStatus(400);
                    } else {
                        response.sendStatus(200);
                    }
                })
            })
        })
    }
})
//add user address
router.put('/update/address/:id', function(request, response){

    User.update({_id : request.params.id}, {$push : {address :request.body.address}}, function(err, user){
        if(err) {
            response.status(500);
        }  else {
            response.json(user);
        }
    })
})

//login


module.exports = router;