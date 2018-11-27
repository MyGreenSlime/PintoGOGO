const Menu = require("../models/menu");
const Snack = require("../models/snack");
const Package = require("../models/package");
const Order = require("../models/order");
const User = require("../models/user");

exports.getAllFood = (req, res) => {
  const error = {};
  Menu.find({}, function(err, menus) {
    if (err) {
      error.food = err;
      res.status(500).send(error);
    } else {
      res.send(menus);
    }
  });
};

exports.getOneMenu = (req, res) => {
  const error = {};
  Menu.findById(req.params.id, function(err, menu) {
    if (err) {
      error.food = err;
      res.status(500).send(error);
    } else {
      res.send(menu);
    }
  });
};

exports.addFood = (req, res) => {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(404).json(error);
  }
  var menu = new Menu();
  menu.menu_name = req.body.menu_name;
  menu.calories = req.body.calories;
  menu.price = req.body.price;
  menu.protein = req.body.protein;
  menu.carbohydrate = req.body.carbohydrate;
  menu.fat = req.body.fat;
  menu.description = req.body.description;
  menu.cholesterol = req.body.cholesterol;
  menu.sodium = req.body.sodium;
  menu.img_url = req.file.path;

  menu.save(function(err, savedMenu) {
    if (err) {
      error.food = err;
      res.status(500).send(error);
    } else {
      res.sendStatus(200);
    }
  });
};

exports.editFood = (req, res) => {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(500).send(error);
  }
  const menuEdit = {
    menu_name: req.body.menu_name,
    calories: req.body.calories,
    price: req.body.price,
    protein: req.body.protein,
    carbohydrate: req.body.carbohydrate,
    fat: req.body.fat,
    description: req.body.description,
    cholesterol: req.body.cholesterol,
    sodium: req.body.sodium,
    img_url: req.body.img_url
  };
  if (req.file) {
    menuEdit.img_url = req.file.path;
  }
  Menu.updateOne(
    { _id: req.params.id },
    {
      $set: {
        menu_name: menuEdit.menu_name,
        calories: menuEdit.calories,
        price: menuEdit.price,
        protein: menuEdit.protein,
        carbohydrate: menuEdit.carbohydrate,
        fat: menuEdit.fat,
        description: menuEdit.description,
        cholesterol: menuEdit.cholesterol,
        sodium: menuEdit.sodium,
        img_url: menuEdit.img_url
      }
    },
    (err, menu) => {
      if (err) {
        error.food = err;
        res.sendStatus(500).json(error);
      } else {
        var status = {
          ok: 1,
          message: "edit menu finish"
        };
        res.json(status);
      }
    }
  );
};

exports.delFood = async (req, res) => {
  const error = {};
  const food_id = req.params.id;
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(404).json(error);
  }
  let query = { _id: req.params.id };

  await Menu.findById(req.params.id, async (err, menu) => {
    if (err) {
      res.status(500).send(err);
    } else {
      await User.updateMany(
        {},
        { $pull: { favorite_food: food_id } },
        (err, user) => {
          console.log("del in user");
        }
      );
      await Order.updateMany(
        {},
        {
          $pull: {
            food_order: {
              food_id: food_id
            }
          }
        },
        (err, order) => {
          console.log("del in food order");
        }
      );

      await Package.find(
        {
          $or: [{ "day_meal.meal_1": food_id }, { "day_meal.meal_2": food_id }]
        },
        async (err, packages) => {
          var len = Object.keys(packages).length;
          for (var i = 0; i < len; i++) {
            var package_id = packages[i]._id;
            await Order.updateMany(
              {},
              {
                $pull: {
                  package_order: {
                    package_id: package_id
                  }
                }
              },
              (err, order) => {
                console.log("del in package order");
              }
            );
          }
        }
      );
      await Package.deleteMany(
        {
          $or: [{ "day_meal.meal_1": food_id }, { "day_meal.meal_2": food_id }]
        },
        err => {
          console.log("del in package");
        }
      );

      await Menu.deleteOne(query, function(err) {
        if (err) {
          error.food = err;
          res.status(500).send(error);
        } else {
          var status = {
            ok: 1,
            message: "delete menu finish"
          };
          console.log("del menu");
          res.json(status);
        }
      });
    }
  });
};

exports.getAllSnack = (req, res) => {
  const error = {};
  Snack.find({}, function(err, snacks) {
    if (err) {
      error.snack = err;
      res.status(500).send(error);
    } else {
      res.send(snacks);
    }
  });
};

exports.getOneSnack = (req, res) => {
  const error = {};
  Snack.findById(req.params.id, function(err, snack) {
    if (err) {
      error.snack = err;
      res.status(500).send(error);
    } else {
      res.send(snack);
    }
  });
};

exports.addSnack = (req, res) => {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(404).json(error);
  }
  var snack = new Snack();
  (snack.snack_name = req.body.snack_name),
    (snack.calories = req.body.calories),
    (snack.price = req.body.price),
    (snack.protein = req.body.protein),
    (snack.carbohydrate = req.body.carbohydrate),
    (snack.fat = req.body.fat),
    (snack.description = req.body.description),
    (snack.cholesterol = req.body.cholesterol),
    (snack.sodium = req.body.sodium),
    (snack.img_url = req.file.path);

  snack.save(function(err, savedSnack) {
    if (err) {
      error.snack = err;
      res.status(500).send(error);
    } else {
      res.sendStatus(200);
    }
  });
};

exports.editSnack = (req, res) => {
  const error = {};
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(500).send(error);
  }
  const snackEdit = {
    snack_name: req.body.snack_name,
    calories: req.body.calories,
    price: req.body.price,
    protein: req.body.protein,
    carbohydrate: req.body.carbohydrate,
    fat: req.body.fat,
    description: req.body.description,
    cholesterol: req.body.cholesterol,
    sodium: req.body.sodium,
    img_url: req.body.img_url
  };
  if (req.file) {
    snackEdit.img_url = req.file.path;
  }
  Snack.updateOne(
    { _id: req.params.id },
    {
      $set: {
        snack_name: snackEdit.snack_name,
        calories: snackEdit.calories,
        price: snackEdit.price,
        protein: snackEdit.protein,
        carbohydrate: snackEdit.carbohydrate,
        fat: snackEdit.fat,
        description: snackEdit.description,
        cholesterol: snackEdit.cholesterol,
        sodium: snackEdit.sodium,
        img_url: snackEdit.img_url
      }
    },
    (err, snack) => {
      if (err) {
        error.snack = err;
        res.sendStatus(500).json(error);
      } else {
        var status = {
          ok: 1,
          message: "edit snack finish"
        };
        res.json(status);
      }
    }
  );
};

exports.delSnack = async (req, res) => {
  const error = {};
  const snack_id = req.params.id;
  if (!req.user.type) {
    error.admin = "need admin account";
    res.status(404).json(error);
  }
  let query = { _id: req.params.id };

  await Snack.findById(req.params.id, async (err, snack) => {
    if (err) {
      res.status(500).send(err);
    } else {
      await User.updateMany(
        {},
        { $pull: { favorite_snack: snack_id } },
        (err, user) => {
          console.log("del in user");
        }
      );
      await Order.updateMany(
        {},
        {
          $pull: {
            snack_order: {
              snack_id: snack_id
            }
          }
        },
        (err, order) => {
          console.log("del in snack order");
        }
      );
      await Snack.deleteOne(query, function(err) {
        if (err) {
          error.snack = err;
          res.status(500).send(error);
        } else {
          var status = {
            ok: 1,
            message: "delete snack finish"
          };
          console.log("del snack");
          res.json(status);
        }
      });
    }
  });
};
