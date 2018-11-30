const express = require("express");
const router = express.Router();
const passport = require("passport");

const paymentControl = require('../controllers/payment_control')
router.post(
  "/charge",
  passport.authenticate("jwt", {
    session: false
  }),
  paymentControl.charge);
module.exports = router;
