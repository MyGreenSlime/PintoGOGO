const express = require('express');
const router = express.Router();
const passport = require('passport');

const packageControl = require('../controllers/package_control')

router.get('/:id',packageControl.getOnePackage);

router.get('/user/all',passport.authenticate('jwt',{ session : false }), packageControl.getAllUserPackage);

router.get('/system/all', packageControl.getSystemAllPackage);

router.get('/system/3days', packageControl.getSystem3DayPackage);

router.get('/system/5days', packageControl.getSystem5DayPackage);

router.get('/system/7days', packageControl.getSystem7DayPackage);

router.post('/add',passport.authenticate('jwt',{ session : false }), packageControl.addPackage);
//add package to cart anonymous
router.post('/anonymous/addcart',passport.authenticate('jwt',{ session : false }), packageControl.anonymousAddCart);
//delete package system
router.delete('/del/:id',passport.authenticate('jwt',{ session : false }), packageControl.delPackage);

module.exports = router;