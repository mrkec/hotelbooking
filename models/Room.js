const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    imageUrl: [],
    currentBooking: [],
    desc: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
