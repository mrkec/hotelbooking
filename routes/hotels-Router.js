const Hotel = require("../models/Hotel");
const { isAdmin } = require("../utlis/verfyAuth");

const router = require("express").Router();

// CREATE

router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const saveHotel = await newHotel.save();
    return res.status(201).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// UPDATE
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //   const saveHotel = await newHotel.save();
    return res.status(201).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ALL
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    //   const saveHotel = await newHotel.save();
    return res.status(201).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    //   const saveHotel = await newHotel.save();
    return res.status(201).json("Hotel Delted Sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
