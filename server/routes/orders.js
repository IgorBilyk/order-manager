const router = require("express").Router();
//Gt user chema
const Order = require("../schema/order");

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
router.route("/reserves").post((req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  Order.create(order)
    .then((order) => res.json(user))
    .catch((error) => res.json(error));
});
router.route("/reserves").get(async (req, res) => {
  const allOrders = await Order.find({});

  res.send(allOrders);
});
//Get all orders fro DB
/* app.get("/reserves", async (req, res) => {
  const allOrders = await Order.find({});

  res.send(allOrders);
}); */
//************************ */
//Get specific user
router.route("/:value").get((req, res) => {
  const regex = new RegExp(req.params.value, "i");
  res.send(req.params.value);
  console.log(req.params.value);
  const order = Order.find({});

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
