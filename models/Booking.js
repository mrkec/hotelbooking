const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  room: {
    type: String,
  },
  roomId: {
    type: String,
  },
  userId: {
    type: String,
  },
  checkInDate: {
    type: String,
  },
  checkOutDate: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  days: {
    type: Number,
  },
  transactionId: {
    type: String,
  },
  status: {
    type: String,
    default: "booked",
  },
});

const BookingModel = new model("Booking", BookingSchema);
module.exports = BookingModel;
