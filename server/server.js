const express = require("express");
const app = express();
app.use(express.static("public"));
//routes to orders
const reservsRoutes = require("./routes/orders");
app.use("/reserves", reservsRoutes);
//.dotenv
require("dotenv").config();
const uri = process.env.MONGODB_URL_CONNECTION;

//Gt user chema
const Order = require("./schema/order");

global.bodyParser = require("body-parser");

//Get mongoose
const mongoose = require("mongoose");
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

app.use("/static", express.static(__dirname + "./public"));

//Add order to DB
app.post("/add", (req, res) => {
  console.log(req.body);
  const order = new Order({
    table: req.body.table,
    persons: req.body.persons,
    notes: req.body.notes,
    date: req.body.date,
    bookingDate: Date.parse(req.body.bookingDate),
    time: req.body.time,
    name: req.body.name,
    phone: req.body.phone,
  });
  order
    .save()
    .then(() => res.json("Order added !"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
  /*  Order.create(order)
    .then((order) => res.json(order))
    .catch((error) => res.json(error)); */
});
//Get all orders fro DB
app.get("/reserves", async (req, res) => {
  const allOrders = await Order.find({});

  res.send(allOrders);
});
//Get specific user
app.get(`/:value`, (req, res) => {
  const regex = new RegExp(req.params.value, "i");
  res.send(req.params.value);
  console.log(req.params.value);
  const order = Order.find({});

  console.log(order);
  res.send(order);
});
//Delete individual post
app.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json(`Error ${err}`));
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
