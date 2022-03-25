const asyncHandler = require("express-async-handler");

import chalk from "chalk";

// import {UserSchema} from "../models/userModel";
// import {AppointmentSchema} from "../models/appointmentModel";

const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

const warning = chalk.hex("#FFA500");
const blue = chalk.hex("#00a1be");
const yellow = chalk.hex("#beb100");
const pink = chalk.hex("#eb51d6");
const salmon = chalk.hex("#ff4f4f");

//

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({user: req.user.id});

  res.status(200);
  res.json(appointments);
});
const setAppointment = asyncHandler(async (req, res) => {
  const {medicalSpecialty, description} = req.body;

  if (!medicalSpecialty || !description) {
    res.status(400);
    throw new Error("Please add a correct appointment");
  }
  const appointment = await Appointment.create({
    user: req.user.id,
    medicalSpecialty: medicalSpecialty,
    description: description,
  });
  console.log(yellow(`🔽 appointment 🔽`));
  console.log(pink(JSON.stringify(appointment)));

  res.status(200).json(appointment);
});

const getAppointment = asyncHandler(async (req, res) => {
  User.find({}, (err, User) => {
    if (err) {
      res.send(err);
    }
    res.json(User);
  });
});

const updateAppointment = asyncHandler(async (req, res) => {
  console.log(pink(`✨ req params id  => ,${req.params.id} `));
  console.log(pink(JSON.stringify(req.params.id)));

  const appointment = await Appointment.findById(req.params.id);

  console.log(blue(`🔽 from updatedAppointment 🔽`));
  console.log(blue(appointment));

  //   console.log(blue(`😘 appointment.user  => , ${appointment.user}`));
  //   Check for user
  if (!appointment) {
    res.status(400);
    throw new Error("Appointment not found");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //   the logged in user matches the appointment user
  if (appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedAppointment = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200);

  console.log(yellow(`🔽 updatedAppointment 🔽`));
  console.log(pink(JSON.stringify(updatedAppointment)));

  res.json(updatedAppointment);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await appointment.remove();

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getAppointments,
  setAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
