const { Schema, model } = require("mongoose");
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  about: {
    type: [String],
    required: true,
  },
  privacyPolicy: {
    type: [String],
    required: true,
  },
});

const ContactModel = new model("Contact", ContactSchema);

module.exports = ContactModel;
