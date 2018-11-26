const express = require("express");
const router = express.Router();
const passport = require("passport");
const stripe = require("stripe")("sk_test_8YW8vOodJ3Ma6xyCAEMKbCPw");

router.post("/charge", async (req, res) => {
    console.log("inin charge")
    try {
        let {status} = await stripe.charges.create({
          amount: 2000,
          currency: "usd",
          description: "An example charge",
          source: req.body.token_id
        });
    
        res.json({status});
      } catch (err) {
          console.log(err)
        res.status(500).end();
      }
})


module.exports = router;