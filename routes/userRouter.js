import express from "express";
import {
  addNewUser,
  getUsers,
  getUserWithId,
  updatePlayer,
  deleteUserWithId,
  deleteAllUsers,
  loginUser,
  getMe,
} from "../controllers/userControllers";
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const routes = (app) => {
  app.route("/login").post(loginUser);
  app
    .route("/users")
    // .all(protect)
    // Get Endpoint
    .get(getUsers, protect)
    // Post Endpoint
    .post(addNewUser)
    // Delete Endpoint (delete all users)
    .delete(deleteAllUsers);
  app
    .route("/users/:UserId")
    .all(protect)
    // Get specific User Endpoint
    .get(getUserWithId)
    // Update specific User Endpoint
    .put(updatePlayer)
    // Delete specific User Endpoint
    .delete(deleteUserWithId, protect);
  app.route("/me").all(protect).get(getMe);
};
// router.get("/:UserId", protect);
// router.get("/");

export default routes;

// module.exports = router;
