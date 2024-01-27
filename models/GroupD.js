const { Schema, model } = require("mongoose");
const GroupDSchema = new Schema({
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

const GroupDModel = new model("GroupD", GroupDSchema);

module.exports = GroupDModel;
