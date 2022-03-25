const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
const appointmentSchema = mongoose.Schema({
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

module.exports = mongoose.model("Appointment", appointmentSchema);
