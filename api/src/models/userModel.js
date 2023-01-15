const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    cin: {
      type: String,
      required: [true, "Please add a cin"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone"],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
