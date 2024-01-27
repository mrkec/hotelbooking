const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

router.post("/", async (req, res) => {
  const { checkInDate, checkOutDate } = req.body;
  const existingRooms = await Room.find({});

  for (const room of existingRooms) {
    if (room.currentBooking.length > 0) {
      for (const iterator of room.currentBooking) {
        const dateQueryFilter = {
          $and: [
            {
              "currentBooking.checkInDate": {
                $lte: iterator.checkOutDate,
              },
            },
            {
              "currentBooking.checkOutDate": {
                $gte: iterator.checkInDate,
              },
            },
          ],
        };

        const overlappingBookings = await Room.find(dateQueryFilter);

        if (overlappingBookings.length > 0) {
          // Iterate through overlapping bookings
          overlappingBookings.forEach((booking) => {
            console.log("Overlapping Booking:", booking.currentBooking);
          });
        }
      }
    }
  }
});

module.exports = router;
