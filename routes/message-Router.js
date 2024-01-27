const express = require("express");
const FeedbackModel = require("../models/Feedback");
const MessageModel = require("../models/Message");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const newMessage = await new MessageModel({
      message,
    });
    await newMessage.save();
    return res.status(201).json("Message sent Succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const getMessage = await MessageModel.find({});
    return res.status(201).json(getMessage);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MessageModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Message Deleted Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
