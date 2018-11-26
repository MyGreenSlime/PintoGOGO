const express = require("express");
const router = express.Router();
const passport = require('passport');

const multer = require("multer");
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/upload_profile/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadProfile = multer({
  storage: storageProfile,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

const userControl = require('../controllers/user_control')
//register
router.post('/register', userControl.register)

//login
router.post('/login', userControl.login)

//profile user data
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), userControl.getProfile)

//update profile
router.put('/edit/profile', passport.authenticate('jwt', {
  session: false
}), uploadProfile.single('img'), userControl.editProfile)
//add new address
router.put('/add/address', passport.authenticate('jwt', {
  session: false
}), userControl.addAddres)
// del some address
router.delete('/del/address/:id', passport.authenticate('jwt', {
  session: false
}), userControl.delAddress)

//add favorite food
router.put('/add/favorite/food/:id', passport.authenticate('jwt', {
  session: false
}), userControl.addFavoriteFood)

//delete some  favorite food
router.delete('/del/favorite/food/:id', passport.authenticate('jwt', {
  session: false
}), userControl.delFavoriteFood)

//add favorite snack
router.put('/add/favorite/snack/:id', passport.authenticate('jwt', {
  session: false
}), userControl.addFavoriteSnack)

//delete some  favorite snack
router.delete('/del/favorite/snack/:id', passport.authenticate('jwt', {
  session: false
}), userControl.delFavoriteSnack)

module.exports = router;