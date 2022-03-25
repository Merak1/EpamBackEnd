import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a FirstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a Lastname"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    phone: {
      type: Number,
      required: [true, "Please add a phone"],
    },
    isdoctor: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: "123",
    },
    speed: {
      type: Number,
      enum: [1, 2, 3],
    },
    created_date: {
      type: Date,
      date: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
