const express = require("express");
const app = express();
app.use(express.static("public"));
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

app.post("/reserves", (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  Order.create(order)
    .then((order) => res.json(user))
    .catch((error) => res.json(error));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
