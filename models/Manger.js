const { Schema, model } = require("mongoose");
const MangerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },

  aadhar: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const MangerModel = new model("Manger", MangerSchema);

module.exports = MangerModel;
