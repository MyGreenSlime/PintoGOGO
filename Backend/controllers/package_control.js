const Package = require('../models/package');
const Order =  require('../models/order')

exports.getOnePackage = (req, res) => {
    const errors = {}
    const package_id = req.params.id
    Package.find({_id : package_id})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.getAllUserPackage = (req, res) =>{
    const errors = {}
    Package.find({owner : req.user.user_name, saved : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.getSystemAllPackage =  (req, res) => {
    const errors = {}
    Package.find({by_admin : true, saved : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.getSystem3DayPackage = (req, res) => {
    const errors = {}
    Package.find({type : 3, by_admin : true, saved : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.getSystem5DayPackage = (req, res) => {
    const errors = {}
    Package.find({type : 5, by_admin : true, saved : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.getSystem7DayPackage = (req, res) => {
    const errors = {}
    Package.find({type : 7, by_admin : true, saved : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = err
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
}

exports.addPackage = (req, res) => {
    const package_id = req.body.package_id;
    const error = {}
    var status = {
        ok : 1,
        message : "add package finish",
        data : null
    }
    var newPackage = new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal,
        by_admin :req.user.type,
        owner : req.user.user_name,
        saved : true
    })
    Package.findOne({_id : package_id}, (err, package) => {
        if(package) {
            var makeNewPackage = false
            for(var i = 0; i < 0; i++) {
                if(String(package.day_meal[i].meal_1) != String(newPackage.day_meal[i].meal_1)){
                    makeNewPackage = !makeNewPackage;
                    console.log(package.day_meal[i].meal_1, newPackage.day_meal[i].meal_1)
                    break;
                }
                if(String(package.day_meal[i].meal_2)  != String(newPackage.day_meal[i].meal_2)){
                    makeNewPackage = !makeNewPackage;
                    console.log(package.day_meal[i].meal_2, newPackage.day_meal[i].meal_2)
                    break;
                }
            }
            if(makeNewPackage) {
                newPackage.save(function(err, savedPackage){
                    if (err) {
                        error.package = err
                        res.status(500).send(error);
                    } else {
                        status.data = {
                            package_id : savedPackage._id
                        }
                        res.json(status);
                    }
                })
            } else {
                Package.updateOne({_id : package_id}, {
                    $set : {
                        saved : true,
                        by_admin : req.user.type
                    }
                }, (err, package) => {
                    status.data = {
                        package_id : package_id
                    }
                    res.json(status);
                })
            }
        } else {
            newPackage.save(function(err, savedPackage){
                if (err) {
                    error.package = err
                    res.status(500).send(error);
                } else {
                    status.data = {
                        package_id : savedPackage._id
                    }
                    res.json(status);
                }
            })  
        }
    })
}

exports.addCart = (req, res) => {
    const package_id = req.body.package_id
    const error = {}
    var status = {
        ok : 1,
        message : "add new package finish",
        data : null
    }
    
    var newPackage =  new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal,
        owner : req.user.user_name,
        saved : false
    })
    console.log(package_id)
    Package.findOne({_id : package_id}, function(err, package){
      if(package) {
        var isInc = true
        for(var i = 0; i < newPackage.type; i++){
            if(String(package.day_meal[i].meal_1) != String(newPackage.day_meal[i].meal_1)){
                isInc = !isInc;
                console.log(package.day_meal[i].meal_1, newPackage.day_meal[i].meal_1)
                break;
            }
            if(String(package.day_meal[i].meal_2)  != String(newPackage.day_meal[i].meal_2)){
                isInc = !isInc;
                console.log(package.day_meal[i].meal_2, newPackage.day_meal[i].meal_2)
                break;
            }
        }
        if(isInc){
            console.log("in1")
            Order.updateOne({user_id : req.user.id, isfinish : false, "package_order.package_id" : package_id},{
                $inc : {"package_order.$.amount" : 1}
            }, (err, order) => {
                if(err) {
                    error.package = err
                    res.sendStatus(500).json(error)
                } else {
                    if (order.nModified == 0) {
                        console.log("in2")
                        const newPackageOrder = {
                            package_id : package_id,
                            package_name : newPackage.name_package,
                            price : newPackage.price,
                            amount : 1
                        }
                        Order.updateOne(
                            {user_id: req.user.id, isfinish: false },
                            {
                                $push: { package_order: newPackageOrder }
                            },
                            (err, order) => {
                                if (err) {
                                    error.orders = err;
                                    res.sendStatus(400).json(error);
                                } else {
                                    status.data = {
                                        package_id : package_id
                                    } 
                                    res.json(status);
                                }
                            } 
                        );
                    } else {
                        console.log("in3")
                        status.message = "increase amount finish"
                        status.data = {
                        package_id : package_id
                        }
                        res.json(status)
                    }
                }
            })
        } else {
            console.log("in4")
            newPackage.save()
                .then(package => {
                    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
                        const newPackageOrder = {
                            package_id : package._id,
                            package_name : package.name_package,
                            price : package.price,
                            amount : 1
                        }
                        Order.updateOne({user_id : req.user.id, isfinish : false},{
                            $push : {package_order : newPackageOrder}
                        }, (err, order) => {
                            if(err) {
                                error.package = err
                                res.sendStatus(400).json(error)
                            } else {
                                status.data = {
                                package_id : newPackageOrder.package_id
                                }
                                res.json(status)
                            }
                        })
                    })
                })
                .catch((err) => {
                    error.package = err
                    res.status(500).send(error)
                });
        }
        
      } else {
            console.log("in5")
            newPackage.save()
                .then(package => {
                    Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
                        const newPackageOrder = {
                            package_id : package._id,
                            package_name : package.name_package,
                            price : package.price,
                            amount : 1
                        }
                        Order.updateOne({user_id : req.user.id, isfinish : false},{
                            $push : {package_order : newPackageOrder}
                        }, (err, order) => {
                            if(err) {
                                error.package = err
                                res.sendStatus(400).json(error)
                            } else {
                                status.data = {
                                package_id : newPackageOrder.package_id
                                }
                                res.json(status)
                            }
                        })
                    })
                })
                .catch((err) => {
                    error.package = err
                    res.status(500).send(error)
                });
        }
    })
}

exports.delPackage = async (req, res) => {
    const error = {};
    const query = {_id : req.params.id}
    await Package.findById(req.params.id, async function(err, package){
        if(err){
            error.package = err
            res.status(500).send(error);
        } else {
            if(package.owner == req.user.user_name || req.user.type){
                var package_id = package._id
                await Order.updateMany({},
                    {
                        $pull : {
                            package_order : {
                                package_id : package_id
                            }
                        }
                    }, (err, order) => {
                        console.log("del in package order");
                    })
                await Package.deleteOne(query, function(err){
                        if(err){
                            error.package = err
                            res.status(500).send(error);
                        } else {
                            console.log("del in package");
                            var status = {
                                ok : 1,
                                message : "delete package finish"
                            }
                            res.json(status);
                        }
                    })
                
            } else {
                error.package = " Admin or Owner"
                res.json(error)
            }
        }
    })
}

