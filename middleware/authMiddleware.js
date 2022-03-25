const jwt = require("jsonwebtoken");
const warning = chalk.hex("#FFA500");
import chalk from "chalk";
// import mongoose from "mongoose";
const User = require("../models/userModel");

const blue = chalk.hex("#00a1be");
const yellow = chalk.hex("#beb100");
const pink = chalk.hex("#eb51d6");
const salmon = chalk.hex("#ff4f4f");
const green = chalk.hex("#87FF4F");

const asyncHandler = require("express-async-handler");
import {UserSchema} from "../models/userModel";

// const User = mongoose.model("User", UserSchema);

export const protect = asyncHandler(async (req, res, next) => {
  console.log(warning("Auth Middleware working 👍"));
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      console.log(blue(`token=>  🔽`));
      console.log(blue(token));
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      console.log(pink(`decoded id  🔽🔽`));
      console.log(pink(JSON.stringify(decoded.id)));

      req.user = await User.findById(decoded.id).select("-password");
      console.log(yellow(`The user is => ${req.user}`));

      console.log(green(`The user is verified, has the credentiasl ✔✔`));

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized ");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("You are not authorized, you dont have the token");
  }
});
