const { Schema, model } = require("mongoose");
const FeedbackSchema = new Schema({
  feedbackMessage: {
    type: [String],
    required: true,
  },
  feedbackUserName: {
    type: String,
  },
  feedbackUserMobile: {
    type: Number,
  },
});

const FeedbackModel = new model("Feedback", FeedbackSchema);
module.exports = FeedbackModel;
