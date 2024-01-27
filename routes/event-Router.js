const express = require("express");
const EventModel = require("../models/Event");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { name, imageUrl } = req.body;
  console.log(name, imageUrl);

  try {
    // Check if an event with the same name already exists
    const existingEvent = await EventModel.findOne({ name: name });
    if (existingEvent) {
      return res.status(400).json("Event Name already exists");
    }

    // Create a new event
    const newEvent = new EventModel({
      name,
      imageUrl,
    });

    console.log(newEvent);

    // Save the new event
    await newEvent.save();

    return res.status(201).json("Event Created Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const getEvent = await EventModel.find({});
    return res.status(201).json(getEvent);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updateEvent = await EventModel.findByIdAndUpDate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "Event update Sucessfully", updateEvent });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Event Deleted Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
