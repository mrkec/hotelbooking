const express = require("express");
const BookingModel = require("../models/Booking");
const Room = require("../models/Room");
const router = express.Router();

router.post("/bookedroom", async (req, res) => {
  const { room, checkInDate, checkOutDate, totalAmount, days } = req.body;
  // console.log(typeof checkInDate);

  const newBooking = await new BookingModel({
    room: room.name,
    roomId: room._id,
    userId: "12358",
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    totalAmount: totalAmount,
    days: days,
    transactionId: "123458",
  });
  const savedBooking = await newBooking.save();
  // console.log(savedBooking);
  const bookedRoom = await Room.findOne({ _id: room._id });
  await bookedRoom.currentBooking.push({
    bookingId: savedBooking._id,
    name: savedBooking.room,
    checkInDate: savedBooking.checkInDate,
    checkOutDate: savedBooking.checkOutDate,
    userId: savedBooking.userId,
    status: savedBooking.status,
  });
  await bookedRoom.save();
  res.status(201).json("Room booked Successfully");
});
router.get("/", async (req, res) => {
  const getAllBooking = await BookingModel.find({});
  res.status(200).json(getAllBooking);
});

module.exports = router;
