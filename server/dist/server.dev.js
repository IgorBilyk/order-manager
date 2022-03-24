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

app.get("/:id", function _callee2(req, res) {
  var id, order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params._id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Order.findOne(id));

        case 3:
          order = _context2.sent;
          console.log(order);
          res.status(200).send(order);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Delete individual post

app["delete"]("/:id", function (req, res) {
  var id = req.params.id;
  Order.findByIdAndDelete(id).then(function () {
    return res.json("Exercise deleted.");
  })["catch"](function (err) {
    return res.status(400).json("Error ".concat(err));
  });
}); //Update individual order

app.put("/update/:id", function (req, res) {
  Order.findByIdAndUpdate({
    _id: req.params.id
  }, req.body).then(function (response) {
    res.send(response);
  });
});
app.listen(PORT, function () {
  return console.log("Server is running on port ".concat(PORT));
});