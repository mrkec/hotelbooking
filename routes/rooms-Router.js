const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { isAdmin } = require("../utlis/verfyAuth");

const router = require("express").Router();

// todo CREATE A ROOM
router.post("/", async (req, res) => {
  try {
    // const hotelId = req.params.hotelid;
    // const newRoom = new Room(req.body);
    const newRoom = new Room(req.body);

    const savedRoom = await newRoom.save();

    // await Hotel.findByIdAndUpdate(hotelId, {
    //   $push: { rooms: savedRoom._id },
    // });

    return res.status(201).json(savedRoom);
  } catch (error) {
    // console.error(error);
    res
      .status(400)
      .json({ error: "An error occurred while processing your request." });
  }
});
// GET ALL
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    //   const saveHotel = await newHotel.save();
    return res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });

    //   const saveHotel = await newHotel.save();
    return res.status(201).json("Room Delted Sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ONE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const room = await Room.findById(id);
    // console.log(room);
    return res.status(201).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
