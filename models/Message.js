const { Schema, model } = require("mongoose");
const MessageSchema = new Schema({
  message: {
    type: [String],
    required: true,
  },
});

const MessageModel = new model("Message", MessageSchema);
module.exports = MessageModel;
