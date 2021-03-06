"use strict";

var router = require("express").Router(); //Get order user schema


var Order = require("../schema/order");
/* app.use(express.static("public"));
//routes to orders
const ordersRoutes = require("./routes/orders");
app.use("/order", ordersRoutes);
//.dotenv
require("dotenv").config();
const uri = process.env.MONGODB_URL_CONNECTION;
 */

/* global.bodyParser = require("body-parser"); */
//Get mongoose

/* const mongoose = require("mongoose");
mongoose.connect(uri, () => console.log("Connected to DB"));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/static", express.static(__dirname + "./public")); */
//Add order to DB


router.route("/reserves").post(function (req, res) {
  console.log(req.body);
  var order = new Order(req.body);
  Order.create(order).then(function (order) {
    return res.json(user);
  })["catch"](function (error) {
    return res.json(error);
  });
});
router.route("/reserves").get(function _callee(req, res) {
  var allOrders;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Order.find({}));

        case 2:
          allOrders = _context.sent;
          res.send(allOrders);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Get all orders fro DB

/* app.get("/reserves", async (req, res) => {
  const allOrders = await Order.find({});

  res.send(allOrders);
}); */
//************************ */
//Get specific user

router.route("/:value").get(function (req, res) {
  var regex = new RegExp(req.params.value, "i");
  res.send(req.params.value);
  console.log(req.params.value);
  var order = Order.find({});
  console.log(order);
  res.send(order);
});
/* app.get(`/:value`, (req, res) => {
  const regex = new RegExp(req.params.value, "i");
  res.send(req.params.value);
  console.log(req.params.value);
  const order = Order.find({});

  console.log(order);
  res.send(order);
}); */

module.exports = router;