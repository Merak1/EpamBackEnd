// import express from "express";
// import {
//   setAppointment,
//   deleteAppointment,
//   getAppointments,
//   getAppointment,
//   updateAppointment,
// } from "../controllers/appointmentController.js";
// const {protect} = require("../middleware/authMiddleware");

// const routes = (app) => {
//   app
//     // .route("/me/appointments")
//     .route("/appointments")

//     .all(protect)
//     // Get Endpoint
//     .get(getAppointments)
//     // Post Endpoint
//     .post(setAppointment)
//     // Delete Endpoint (delete all users)
//     //   .delete(deleteAllUsers);
//     //  .all(protect)
//     // Get Endpoint
//     .get(getAppointment)
//     // Post Endpoint
//     // .post(setAppointment)

//     // Update specific User Endpoint
//     .put(updateAppointment);
//   app
//     .route("/appointments/:AppointmentsId")
//     .all(protect)
//     // Update specific Appointment Endpoint
//     .put(updateAppointment)
//     // Delete Endpoint (delete all users)
//     .delete(deleteAppointment);
// };

// export default routes;

const express = require("express");
const router = express.Router();
const {
  getAppointments,
  setAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const {protect} = require("../middleware/authMiddleware");

// Full http://localhost:4000/appointments/

// router.get("/", protect, getAppointments);

router.route("/").get(protect, getAppointments).post(protect, setAppointment);
router
  .route("/:id")
  .delete(protect, deleteAppointment)
  .put(protect, updateAppointment);

module.exports = router;
