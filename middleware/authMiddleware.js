const jwt = require("jsonwebtoken");
const warning = chalk.hex("#FFA500");
import chalk from "chalk";
import mongoose from "mongoose";

const one = chalk.hex("#00a1be");
const two = chalk.hex("#beb100");
const three = chalk.hex("#eb51d6");

const asyncHandler = require("express-async-handler");
import {UserSchema} from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const protect = asyncHandler(async (req, res, next) => {
  console.log(warning("Auth Middleware working 👍"));
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      console.log(two(`headers.authorization=>  🔽`));
      console.log(two(req.headers.authorization));

      console.log(one(`token=>  🔽`));
      console.log(one(token));
      // verufy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      console.log(two(`decoded 🔽🔽`));
      console.log(three(JSON.stringify(decoded)));

      req.user = await User.findById(decoded.id).select("-password");

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
