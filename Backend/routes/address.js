const express = require('express');
const router = express.Router();
const passport = require('passport');

const addressControl = require('../controllers/address_control')

//get all address
router.get('/all',passport.authenticate('jwt',{ session : false }), addressControl.getAllAddress);

//get address made by owner
router.get('/current',passport.authenticate('jwt',{ session : false }), addressControl.getCurrentAddress);

module.exports = router;