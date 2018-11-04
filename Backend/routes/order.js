const express = require("express");
const router = express.Router();
const passport = require("passport");

const Order =  require('../models/order');
const Menu = require('../models/menu');
const Snack = require('../models/snack');
const Bill = require('../models/bill')

//get all order
router.get("/all", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(500).send(error);
  }
  Order.find({})
    .populate({ path: "food_order.food_id", model: "Menu" })
    .populate({ path: "snack_order.snack_id", model: "Snack" })
    .populate({ path: "package_order.package_id", model: "Package" })
    .exec((err, order) => {
      if (err) {
        error.orders = "Could not fetch current order";
        res.status(500).send(error);
      } else {
        res.json(order);
      }
    });
});
//get order by id

//get order by date

//get order by finish

//get order by unfinish

//get order by current order
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    Order.find({ user_id: req.user.id, isfinish: false })
      .populate({ path: "food_order.food_id", model: "Menu" })
      .populate({ path: "snack_order.snack_id", model: "Snack" })
      .populate({ path: "package_order.package_id", model: "Package" })
      .exec((err, order) => {
        if (err) {
          error.orders = "Could not fetch current order";
          res.status(500).send(error);
        } else {
          res.json(order);
        }
      });
  }
);
//add food to order
router.put(
  "/add/food",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const newfood_order = {
      food_id: req.body.food_id,
      food_name: req.body.food_name,
      price: req.body.price,
      amount: 1
    };
    const error = {};
    console.log(req.user.id);
    Order.findOne({ user_id: req.user.id, isfinish: false }, function(
      err,
      order
    ) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "food_order.food_id": req.body.food_id
          },
          {
            $inc: { "food_order.$.amount": 1 }
          },
          (err, order) => {
            if (err) {
              error.addamount = "can not add amount";
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  { user_id: req.user.id, isfinish: false },
                  {
                    $push: { food_order: newfood_order }
                  },
                  (err, order) => {
                    if (err) {
                      error.addneworder = "can not add new menu to order";
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(order);
                    }
                  }
                );
              } else {
                res.json(order);
              }
            }
          }
        );
      } else {
        const newOrder = new Order({
          user_id: req.user.id,
          food_order: newfood_order
        });
        newOrder
          .save()
          .then(order => res.json(order))
          .catch(err => console.log(err));
      }
    });
  }
);

//add snack to order
router.put(
  "/add/snack",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const newsnack_order = {
      snack_id: req.body.snack_id,
      snack_name: req.body.snack_name,
      price: req.body.price,
      amount: 1
    };
    const error = {};
    console.log(req.user.id);
    Order.findOne({ user_id: req.user.id, isfinish: false }, function(
      err,
      order
    ) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "snack_order.snack_id": req.body.snack_id
          },
          {
            $inc: { "snack_order.$.amount": 1 }
          },
          (err, order) => {
            if (err) {
              error.addamount = "can not add amount";
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  { user_id: req.user.id, isfinish: false },
                  {
                    $push: { snack_order: newsnack_order }
                  },
                  (err, order) => {
                    if (err) {
                      error.addneworder = "can not add new menu to order";
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(order);
                    }
                  }
                );
              } else {
                res.json(order);
              }
            }
          }
        );
      } else {
        const newOrder = new Order({
          user_id: req.user.id,
          snack_order: newsnack_order
        });
        newOrder
          .save()
          .then(order => res.json(order))
          .catch(err => console.log(err));
      }
    });
  }
);
//add package to order
router.put(
  "/add/package",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const newpackage_order = {
      package_id: req.body.package_id,
      package_name: req.body.package_name,
      price: req.body.price,
      amount: 1
    };
    const error = {};
    console.log(req.user.id);
    Order.findOne({ user_id: req.user.id, isfinish: false }, function(
      err,
      order
    ) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "package_order.package_id": req.body.package_id
          },
          {
            $inc: { "package_order.$.amount": 1 }
          },
          (err, order) => {
            if (err) {
              error.addamount = "can not add amount";
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  { user_id: req.user.id, isfinish: false },
                  {
                    $push: { package_order: newpackage_order }
                  },
                  (err, order) => {
                    if (err) {
                      error.addneworder = "can not add new menu to order";
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(order);
                    }
                  }
                );
              } else {
                res.json(order);
              }
            }
          }
        );
      } else {
        const newOrder = new Order({
          user_id: req.user.id,
          package_order: newpackage_order
        });
        newOrder
          .save()
          .then(order => res.json(order))
          .catch(err => console.log(err));
      }
    });
  }
);
//increase amount food
router.put(
  "/increase/amount/food/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const food_id = req.params.id;
    const error = {};
    Order.updateOne(
      { user_id: req.user.id, isfinish: false, "food_order.food_id": food_id },
      {
        $inc: { "food_order.$.amount": 1 }
      },
      (err, order) => {
        if (err) {
          error.addamount = "can not add amount";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
      }
    );
  }
);
//increase amount snack
router.put(
  "/increase/amount/snack/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const snack_id = req.params.id;
    const error = {};
    Order.updateOne(
      {
        user_id: req.user.id,
        isfinish: false,
        "snack_order.snack_id": snack_id
      },
      {
        $inc: { "snack_order.$.amount": 1 }
      },
      (err, order) => {
        if (err) {
          error.addamount = "can not add amount";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
      }
    );
  }
);
//increase amount package
router.put(
  "/increase/amount/package/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const package_id = req.params.id;
    const error = {};
    Order.updateOne(
      {
        user_id: req.user.id,
        isfinish: false,
        "package_order.package_id": package_id
      },
      {
        $inc: { "package_order.$.amount": 1 }
      },
      (err, order) => {
        if (err) {
          error.addamount = "can not add amount";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
      }
    );
  }
);
//decrease amount food
router.put(
  "/decrease/amount/food/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const food_id = req.params.id;
    Order.updateOne(
      { user_id: req.user.id, isfinish: false, "food_order.food_id": food_id },
      {
        $inc: { "food_order.$.amount": -1 }
      },
      (err, order) => {
        if (err) {
          error.decreaseamount = "can not decrease amount food";
          res.sendStatus(400).json(error);
        } else {
          Order.updateOne(
            { user_id: req.user.id, isfinish: false },
            {
              $pull: {
                food_order: {
                  food_id: food_id,
                  amount: { $lte: 0 }
                }
              }
            },
            (err, order) => {
              if (err) {
                error.deleteorderlist = "cannot delete snack in food";
                res.sendStatus(400).json(error);
              } else {
                res.json(order);
              }
            }
          );
        }
      }
    );
  }
);
//decrease amount snack
router.put(
  "/decrease/amount/snack/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const snack_id = req.params.id;
    Order.updateOne(
      {
        user_id: req.user.id,
        isfinish: false,
        "snack_order.snack_id": snack_id
      },
      {
        $inc: { "snack_order.$.amount": -1 }
      },
      (err, order) => {
        if (err) {
          error.decreaseamount = "can not decrease amount snack";
          res.sendStatus(400).json(error);
        } else {
          Order.updateOne(
            { user_id: req.user.id, isfinish: false },
            {
              $pull: {
                snack_order: {
                  snack_id: snack_id,
                  amount: { $lte: 0 }
                }
              }
            },
            (err, order) => {
              if (err) {
                error.deleteorderlist = "cannot delete snack in order";
                res.sendStatus(400).json(error);
              } else {
                res.json(order);
              }
            }
          );
        }
      }
    );
  }
);
//decrease amount package
router.put(
  "/decrease/amount/package/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const package_id = req.params.id;
    Order.updateOne(
      {
        user_id: req.user.id,
        isfinish: false,
        "package_order.package_id": package_id
      },
      {
        $inc: { "package_order.$.amount": -1 }
      },
      (err, order) => {
        if (err) {
          error.decreaseamount = "can not decrease amount package";
          res.sendStatus(400).json(error);
        } else {
          Order.updateOne(
            { user_id: req.user.id, isfinish: false },
            {
              $pull: {
                package_order: {
                  package_id: package_id,
                  amount: { $lte: 0 }
                }
              }
            },
            (err, order) => {
              if (err) {
                error.deleteorderlist = "cannot delete package in order";
                res.sendStatus(400).json(error);
              } else {
                res.json(order);
              }
            }
          );
        }
      }
    );
  }
);
//del food from order
router.delete(
  "/del/food/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const food_id = req.params.id;
    Order.updateOne(
      { user_id: req.user.id, isfinish: false },
      {
        $pull: {
          food_order: {
            food_id: food_id
          }
        }
      },
      (err, order) => {
        if (err) {
          error.deleteorderlist = "cannot delete food in order";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
      }
    );
  }
);
//del snack from order
router.delete(
  "/del/snack/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const snack_id = req.params.id;
    Order.updateOne(
      { user_id: req.user.id, isfinish: false },
      {
        $pull: {
          snack_order: {
            snack_id: snack_id
          }
        }
      },
      (err, order) => {
        if (err) {
          error.deleteorderlist = "cannot delete snack in order";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
      }
    );
  }
);
//del package from order
router.delete(
  "/del/package/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const error = {};
    const package_id = req.params.id;
    Order.updateOne(
      { user_id: req.user.id, isfinish: false },
      {
        $pull: {
          package_order: {
            package_id: package_id
          }
        }
      },
      (err, order) => {
        if (err) {
          error.deleteorderlist = "cannot delete package in order";
          res.sendStatus(400).json(error);
        } else {
          res.json(order);
        }
    })
})

// pass value to bill
router.put('/tobill', passport.authenticate('jwt',{ session : false }), function(req, res){
    const error = {}
    const newBill = new Bill({
        order : req.body.order_id,
        user : req.user.id,
        order_cost : req.body.totalprice,
    })
    Order.updateOne({user_id : req.user.id, isfinish : false},{
        $set : {
            totalprice : req.body.totalprice,
            update_time  : Date.now
        }
    })
    Bill.findOne({user : req.user.id, isfinish : false}, function(err, bill) {
        if(bill) {
            Bill.updateOne({user : req.user.id, isfinish : false},{
                $set : {order_cost : req.body.totalprice}
            }, (err, bill) => {
                if(err) {
                    error.order_cost = "cannot set order cost"
                    res.sendStatus(500).json(error)
                } else {
                    res.json(bill)
                }
            })
        } else {
            newBill.save()
            .then(bill => res.json(bill))
            .catch(err => console.log(err));
        }
    })
})


//checkout

module.exports = router;
