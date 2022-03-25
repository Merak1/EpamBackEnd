// import express from "express";
// import {
//   addNewUser,
//   getUsers,
//   getUserWithId,
//   updatePlayer,
//   deleteUserWithId,
//   deleteAllUsers,
//   loginUser,
//   getMe,
// } from "../controllers/userController";

// const {protect} = require("../middleware/authMiddleware");

// const routes = (app) => {
//   app.route("/login").post(loginUser);
//   app
//     .route("/users")
//     // .all(protect)
//     // Get Endpoint
//     .get(getUsers)
//     // Post Endpoint
//     .post(addNewUser)
//     // Delete Endpoint (delete all users)
//     .delete(deleteAllUsers);
//   app
//     .route("/users/:UserId")
//     // .all(protect)
//     // Get specific User Endpoint
//     .get(getUserWithId)
//     // Update specific User Endpoint
//     .put(updatePlayer)
//     // Delete specific User Endpoint
//     .delete(deleteUserWithId, protect);
//   app.route("/me").all(protect).get(getMe);
// };

// export default routes;

const express = require("express");
const router = express.Router();
const {
  addNewUser,
  loginUser,
  getMe,
  getUsers,
  deleteAllUsers,
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

// Full http://localhost:4000/users/

router.post("/", addNewUser);
router.get("/", getUsers);
router.delete("/", deleteAllUsers);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
