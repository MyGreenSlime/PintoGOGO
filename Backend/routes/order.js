const express = require("express");
const router = express.Router();
const passport = require("passport");
const orderControl = require('../controllers/order_control');

//get all order
router.get("/all", passport.authenticate("jwt", {
    session: false
}), orderControl.getAllOrder);
//get order by id

//get order by date

//get order by finish

//get order by unfinish

//get order by current order
router.get("/current", passport.authenticate("jwt", {
    session: false
}), orderControl.getCurrentOrder);
//add food to order
router.put("/add/food", passport.authenticate("jwt", {
    session: false
}), orderControl.addFood);
//add snack to order
router.put("/add/snack", passport.authenticate("jwt", {
    session: false
}), orderControl.addSnack);
//add package to order
router.put("/add/package", passport.authenticate("jwt", {
    session: false
}), orderControl.addPackage);
//increase amount food
router.put(
    "/increase/amount/food/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.increseAmountFood);
//increase amount snack
router.put(
    "/increase/amount/snack/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.increseAmountSnack);
//increase amount package
router.put(
    "/increase/amount/package/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.increaseAmountPackage);
//decrease amount food
router.put(
    "/decrease/amount/food/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.decreaseAmountFood);
//decrease amount snack
router.put(
    "/decrease/amount/snack/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.decreaseAmountSnack);
//decrease amount package
router.put(
    "/decrease/amount/package/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    orderControl.decreaseAmoutPackage);
//del food from order
router.delete(
    "/del/food/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    orderControl.deleteFood);
//del snack from order
router.delete(
    "/del/snack/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.deleteSnack);
//del package from order
router.delete(
    "/del/package/:id",
    passport.authenticate("jwt", {
        session: false
    }), orderControl.deletePackage)

// pass value to bill
router.put('/tobill', passport.authenticate('jwt', {
    session: false
}), orderControl.passToBill)

//checkout

module.exports = router;