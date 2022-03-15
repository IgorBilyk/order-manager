"use strict";

var express = require("express");

var app = express();
app.use(express["static"]("public")); //routes to orders

var reservsRoutes = require("./routes/orders");

app.use("/reserves", reservsRoutes); //.dotenv

require("dotenv").config();

var uri = process.env.MONGODB_URL_CONNECTION; //Gt user chema

var Order = require("./schema/order");

global.bodyParser = require("body-parser"); //Get mongoose

var mongoose = require("mongoose");

mongoose.connect(uri, function () {
  return console.log("Connected to DB");
});
app.use(bodyParser.urlencoded({
  extended: true,
  limit: "50mb",
  parameterLimit: 100000
}));
app.use(bodyParser.json({
  limit: "50mb",
  parameterLimit: 100000
}));

var cors = require("cors");

app.use(cors());
var PORT = process.env.PORT || 3001;
app.use("/static", express["static"](__dirname + "./public")); //Add order to DB

app.post("/add", function (req, res) {
  console.log(req.body);
  var order = new Order({
    table: req.body.table,
    persons: req.body.persons,
    notes: req.body.notes,
    date: req.body.date,
    bookingDate: Date.parse(req.body.bookingDate),
    time: req.body.time,
    name: req.body.name,
    phone: req.body.phone
  });
  order.save().then(function () {
    return res.json("Order added !");
  })["catch"](function (err) {
    return res.status(400).json("Error: ".concat(err));
  });
  /*  Order.create(order)
    .then((order) => res.json(order))
    .catch((error) => res.json(error)); */
}); //Get all orders fro DB

app.get("/reserves", function _callee(req, res) {
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
}); //Get specific user

app.get("/:value", function (req, res) {
  var regex = new RegExp(req.params.value, "i");
  res.send(req.params.value);
  console.log(req.params.value);
  var order = Order.find({});
  console.log(order);
  res.send(order);
}); //Delete individual post

app["delete"]("/:id", function (req, res) {
  var id = req.params.id;
  Order.findByIdAndDelete(id).then(function () {
    return res.json("Exercise deleted.");
  })["catch"](function (err) {
    return res.status(400).json("Error ".concat(err));
  });
});
app.listen(PORT, function () {
  return console.log("Server is running on port ".concat(PORT));
});