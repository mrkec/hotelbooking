const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // unique:true
    },
    address: {
      type: String,
      required: true,
      // unique:true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = new model("User", UserSchema);

module.exports = User;
