import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  medicalSpecialty: {
    type: String,
    required: [true, "Please add the Speciality"],
  },
  description: {
    type: String,
    required: [true, "Please add a description for the appointment"],
  },
});
