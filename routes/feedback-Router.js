const express = require("express");
const User = require("../models/User");
const FeedbackModel = require("../models/Feedback");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { feedbackMessage, feedbackUserName, feedbackUserMobile } = req.body;
  try {
    const findUser = await User.findOne({ name: feedbackUserName });
    const newFeedback = await new FeedbackModel({
      feedbackMessage,
      feedbackUserName: findUser.name,
      feedbackUserMobile: findUser.mobile,
    });
    await newFeedback.save();
    return res
      .status(201)
      .json("Your feedback is Valuable we will shortly contact to you");
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const getFeedback = await FeedbackModel.find({});
    return res.status(201).json(getFeedback);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await FeedbackModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("feedback Deleted Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
