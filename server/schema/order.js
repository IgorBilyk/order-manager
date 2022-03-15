const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      required: true,
      trim: true,
    },
    persons: {
      type: Number,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
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
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchema);
