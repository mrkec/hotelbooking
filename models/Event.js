const { Schema, model } = require("mongoose");
const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const EventModel = new model("Event", EventSchema);
module.exports = EventModel;
