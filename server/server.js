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
  console.log(Date.parse(req.body.bookingDate));
  const bookingDate = req.body.bookingDate;

  const order = new Order({
    table: req.body.table,
    persons: req.body.persons,
    notes: req.body.notes,
    date: req.body.date,
    bookingDate,
    time: req.body.time,
    name: req.body.name,
    phone: req.body.phone,
  });
  order
    .save()
    .then(() => res.json("Order added !"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
//Get all orders fro DB
app.get("/reserves", async (req, res) => {
  const allOrders = await Order.find({});
  res.send(allOrders);
});
//Get specific user
app.get(`/:id`, async (req, res) => {
  const id = req.params._id;
  const order = await Order.findOne(id);
  console.log(order);
  res.status(200).send(order);
});
//Delete individual post
app.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//Update individual order
app.put("/update/:id", (req, res) => {
  Order.findByIdAndUpdate({ _id: req.params.id }, req.body).then((response) => {
    res.send(response);
  });
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
