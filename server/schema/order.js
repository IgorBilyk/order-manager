const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
});
module.exports = mongoose.model("Order", OrderSchema);
