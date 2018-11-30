const stripe = require("stripe")("sk_test_8YW8vOodJ3Ma6xyCAEMKbCPw");

const Order = require("../models/order");
const Bill = require("../models/bill");

exports.charge = async(req, res) => {
    console.log("inin charge");
    var state = {
      ok: 1,
      message: "payment finish"
    };
    try {
      Bill.findOne(
        {
          user: req.user.id,
          isfinish: false
        },
        async (err, bill) => {
          if (bill) {
            console.log(bill);
            let { status } = await stripe.charges.create({
              amount: bill.total_cost * 100,
              currency: "thb",
              description: "for : " + bill.user + " Order_Id : " + bill.order,
              source: req.body.token_id
            });
            console.log(status)
            await Order.updateOne(
              {
                user_id: req.user.id,
                isfinish: false
              },
              {
                $set: {
                  isfinish: true,
                  update_time: Date.now()
                }
              },
              (err, order) => {
                console.log("manage order finish")
              }
            );

            await Bill.updateOne(
              {
                user: req.user.id,
                isfinish: false
              },
              {
                $set: {
                  isfinish: true,
                  update_time: Date.now()
                }
              },(err, bill) => {
                console.log("manage bill finish")
              }
            );
            var newOrder = new Order({
              user_id: req.user.id
            });
            await newOrder.save();
            res.json(state);
          } else {
            state.message = "no bill";
            res.json(state);
          }
        }
      );
    } catch (err) {
      console.log(err);
      state.ok = 0;
      state.message = err;
      res.status(500).send(state);
    }
  }