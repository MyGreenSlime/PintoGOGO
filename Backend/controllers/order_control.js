const Order = require("../models/order");
const Menu = require("../models/menu");
const Snack = require("../models/snack");
const Bill = require("../models/bill");

exports.getAllOrder = (req, res) => {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(500).send(error);
  }
  Order.find({})
    .populate({
      path: "food_order.food_id",
      model: "Menu"
    })
    .populate({
      path: "snack_order.snack_id",
      model: "Snack"
    })
    .populate({
      path: "package_order.package_id",
      model: "Package"
    })
    .exec((err, order) => {
      if (err) {
        error.orders = err;
        res.status(500).send(error);
      } else {
        res.json(order);
      }
    });
};

exports.getCurrentOrder = (req, res) => {
  const error = {};
  Order.findOne({
    user_id: req.user.id,
    isfinish: false
  })
    .populate({
      path: "food_order.food_id",
      model: "Menu"
    })
    .populate({
      path: "snack_order.snack_id",
      model: "Snack"
    })
    .populate({
      path: "package_order.package_id",
      model: "Package"
    })
    .exec((err, order) => {
      if (err) {
        error.orders = err;
        res.status(500).send(error);
      } else {
        res.json(order);
      }
    });
};

exports.addFood = (req, res) => {
  const newfood_order = {
    food_id: req.body.food_id,
    food_name: req.body.food_name,
    price: req.body.price,
    amount: 1
  };
  var status = {
    ok: 1,
    status: "can add new food to order"
  };
  const error = {};
  Order.findOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    function(err, order) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "food_order.food_id": req.body.food_id
          },
          {
            $inc: {
              "food_order.$.amount": 1
            }
          },
          (err, order) => {
            if (err) {
              error.orders = err;
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  {
                    user_id: req.user.id,
                    isfinish: false
                  },
                  {
                    $push: {
                      food_order: newfood_order
                    }
                  },
                  (err, order) => {
                    if (err) {
                      error.orders = err;
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(status);
                    }
                  }
                );
              } else {
                res.json(status);
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
          .then(order => res.json(status))
          .catch(err => {
            error.orders = err;
            res.status(500).send(error);
          });
      }
    }
  );
};

exports.addSnack = (req, res) => {
  const newsnack_order = {
    snack_id: req.body.snack_id,
    snack_name: req.body.snack_name,
    price: req.body.price,
    amount: 1
  };
  var status = {
    ok: 1,
    status: "can add new snack to order"
  };
  const error = {};
  console.log(req.user.id);
  Order.findOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    function(err, order) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "snack_order.snack_id": req.body.snack_id
          },
          {
            $inc: {
              "snack_order.$.amount": 1
            }
          },
          (err, order) => {
            if (err) {
              error.orders = err;
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  {
                    user_id: req.user.id,
                    isfinish: false
                  },
                  {
                    $push: {
                      snack_order: newsnack_order
                    }
                  },
                  (err, order) => {
                    if (err) {
                      error.orders = err;
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(status);
                    }
                  }
                );
              } else {
                res.json(status);
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
          .then(order => res.json(status))
          .catch(err => {
            error.orders = err;
            res.status(500).send(error);
          });
      }
    }
  );
};

exports.addPackage = (req, res) => {
  const newpackage_order = {
    package_id: req.body.package_id,
    package_name: req.body.package_name,
    price: req.body.price,
    amount: 1
  };
  var status = {
    ok: 1,
    status: "can add new package to order"
  };
  const error = {};
  console.log(req.user.id);
  Order.findOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    function(err, order) {
      if (order) {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false,
            "package_order.package_id": req.body.package_id
          },
          {
            $inc: {
              "package_order.$.amount": 1
            }
          },
          (err, order) => {
            if (err) {
              error.orders = err;
              res.sendStatus(400).json(error);
            } else {
              if (order.nModified == 0) {
                Order.updateOne(
                  {
                    user_id: req.user.id,
                    isfinish: false
                  },
                  {
                    $push: {
                      package_order: newpackage_order
                    }
                  },
                  (err, order) => {
                    if (err) {
                      error.orders = err;
                      res.sendStatus(400).json(error);
                    } else {
                      res.json(status);
                    }
                  }
                );
              } else {
                res.json(status);
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
          .then(order => res.json(status))
          .catch(err => {
            error.orders = err;
            res.status(500).send(error);
          });
      }
    }
  );
};

exports.increseAmountFood = (req, res) => {
  const food_id = req.params.id;
  const error = {};
  var status = {
    ok: 1,
    status: "can add amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "food_order.food_id": food_id
    },
    {
      $inc: {
        "food_order.$.amount": 1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.increseAmountSnack = (req, res) => {
  const snack_id = req.params.id;
  const error = {};
  var status = {
    ok: 1,
    status: "can add amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "snack_order.snack_id": snack_id
    },
    {
      $inc: {
        "snack_order.$.amount": 1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.increaseAmountPackage = (req, res) => {
  const package_id = req.params.id;
  const error = {};
  var status = {
    ok: 1,
    status: "can add amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "package_order.package_id": package_id
    },
    {
      $inc: {
        "package_order.$.amount": 1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.decreaseAmountFood = (req, res) => {
  const error = {};
  const food_id = req.params.id;
  var status = {
    ok: 1,
    status: "can decrease amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "food_order.food_id": food_id
    },
    {
      $inc: {
        "food_order.$.amount": -1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = "can not decrease amount food";
        res.sendStatus(400).json(error);
      } else {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false
          },
          {
            $pull: {
              food_order: {
                food_id: food_id,
                amount: {
                  $lte: 0
                }
              }
            }
          },
          (err, order) => {
            if (err) {
              error.orders = err;
              res.sendStatus(400).json(error);
            } else {
              res.json(status);
            }
          }
        );
      }
    }
  );
};

exports.decreaseAmountSnack = (req, res) => {
  const error = {};
  const snack_id = req.params.id;
  var status = {
    ok: 1,
    status: "can decrease amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "snack_order.snack_id": snack_id
    },
    {
      $inc: {
        "snack_order.$.amount": -1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false
          },
          {
            $pull: {
              snack_order: {
                snack_id: snack_id,
                amount: {
                  $lte: 0
                }
              }
            }
          },
          (err, order) => {
            if (err) {
              error.err = err;
              res.sendStatus(400).json(error);
            } else {
              res.json(status);
            }
          }
        );
      }
    }
  );
};

exports.decreaseAmoutPackage = (req, res) => {
  const error = {};
  const package_id = req.params.id;
  var status = {
    ok: 1,
    status: "can decrease amount"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false,
      "package_order.package_id": package_id
    },
    {
      $inc: {
        "package_order.$.amount": -1
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        Order.updateOne(
          {
            user_id: req.user.id,
            isfinish: false
          },
          {
            $pull: {
              package_order: {
                package_id: package_id,
                amount: {
                  $lte: 0
                }
              }
            }
          },
          (err, order) => {
            if (err) {
              error.orders = err;
              res.sendStatus(400).json(error);
            } else {
              res.json(status);
            }
          }
        );
      }
    }
  );
};

exports.deleteFood = (req, res) => {
  const error = {};
  const food_id = req.params.id;
  var status = {
    ok: 1,
    status: "delete food from order"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    {
      $pull: {
        food_order: {
          food_id: food_id
        }
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.deleteSnack = (req, res) => {
  const error = {};
  const snack_id = req.params.id;
  var status = {
    ok: 1,
    status: "delete snack from order"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    {
      $pull: {
        snack_order: {
          snack_id: snack_id
        }
      }
    },
    (err, order) => {
      if (err) {
        error.order = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.deletePackage = (req, res) => {
  const error = {};
  const package_id = req.params.id;
  var status = {
    ok: 1,
    status: "delete package from order"
  };
  Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    {
      $pull: {
        package_order: {
          package_id: package_id
        }
      }
    },
    (err, order) => {
      if (err) {
        error.orders = err;
        res.sendStatus(400).json(error);
      } else {
        res.json(status);
      }
    }
  );
};

exports.passToBill = async (req, res) => {
  const error = {};
  const newBill = new Bill({
    order: req.body.order_id,
    user: req.user.id,
    order_cost: req.body.totalprice
  });
  var status = {
    ok: 1,
    status: "create bill"
  };
  await Order.updateOne(
    {
      user_id: req.user.id,
      isfinish: false
    },
    {
      $set: {
        totalprice: req.body.totalprice,
        update_time: Date.now()
      }
    }
  );
  await Bill.findOne(
    {
      user: req.user.id,
      isfinish: false
    },
    async (err, bill) => {
      if (bill) {
        await Bill.updateOne(
          {
            user: req.user.id,
            isfinish: false
          },
          {
            $set: {
              order_cost: req.body.totalprice
            }
          },
          (err, bill) => {
            if (err) {
              error.orders = err;
              res.sendStatus(500).json(error);
            } else {
              status.message = "update bill";
              res.json(status);
            }
          }
        );
      } else {
        newBill
          .save()
          .then(bill => res.json(status))
          .catch(err => {
            error.bills = err;
            res.status(500).send(error);
          });
      }
    }
  );
};
