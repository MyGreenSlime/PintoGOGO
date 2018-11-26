const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const storageFood = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/upload_food/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);

    }
});

const storageSnack = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/upload_snack/');
    },
    filename: function (req, file, cb) {
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
    storage: storageFood,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

const uploadSnack = multer({
    storage: storageSnack,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

const menuControl = require('../controllers/menu_control');

//-----------------------------------------------------food-----------------------------------------------
//find all menu
router.get('/food', menuControl.getAllFood);
//find single menu
router.get('/food/:id', menuControl.getOneMenu);
// add new menu
router.post('/food/add', passport.authenticate('jwt', {
    session: false
}), uploadFood.single('img'), menuControl.addFood);
//edit menu fro admin
router.put('/food/edit/:id', passport.authenticate('jwt', {
    session: false
}), uploadFood.single('img'), menuControl.editFood);
//delete menu for admin
router.delete('/food/del/:id', passport.authenticate('jwt', {
    session: false
}), menuControl.delFood)

//---------------------------------------------------snack-------------------------------------------------

//find all menu
router.get('/snack', menuControl.getAllSnack);
//find single menu
router.get('/snack/:id', menuControl.getOneSnack);
//add new snack
router.post('/snack/add', passport.authenticate('jwt', {
    session: false
}), uploadSnack.single('img'), menuControl.addSnack);
//edit snack from admin
router.put('/snack/edit/:id', passport.authenticate('jwt', {
    session: false
}), uploadSnack.single('img'), menuControl.editSnack);
//delete snack for admin
router.delete('/snack/del/:id', passport.authenticate('jwt', {
    session: false
}), menuControl.delSnack)

module.exports = router;