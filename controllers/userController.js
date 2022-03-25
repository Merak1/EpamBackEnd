import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
import chalk from "chalk";

import {UserSchema} from "../models/userModel";

const warning = chalk.hex("#FFA500");
const blue = chalk.hex("#00a1be");
const yellow = chalk.hex("#beb100");
const pink = chalk.hex("#eb51d6");
const salmon = chalk.hex("#ff4f4f");

const User = mongoose.model("User", UserSchema);

export const addNewUser = asyncHandler(async (req, res) => {
  let {firstName, lastName, email, phone, isdoctor, password} = req.body;

  // //? This is in order for the Admin user to create Users with a default password,
  // //? it should be changed the first time the user enters
  // //! Do not do this

  // if (password === undefined /*and the user is type Admin*/) {
  //   password = "default";
  // }
  //? Validate that the form is sending all the data
  if (!firstName || !lastName || !email || !phone) {
    req.status(400);
    throw new Error("please send all data ");
  }

  //? Prevent duplicate accounts
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error(warning("User already exists"));
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    isdoctor,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      isdoctor: user.isdoctor,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  //Finish the login functionality 22:39

  const {email, password, _id} = req.body;

  const user = await User.findOne({email});
  console.log(blue(`email=>  ${email}`));

  console.log(yellow(`password=>  ${password}`));

  // console.log(pink(`user=>  ${user}`));

  if (user && (await bcrypt.compare(password, user.password))) {
    // user
    // user.token = generateToken(user._id);
    user.token = generateToken(_id);
    console.log(pink(`user=>  ${user}`));
    console.log(warning(`token=>  ${user.token}`));

    // res.json(user);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isdoctor: user.isdoctor,
      password: user.password,
      token: user.token,
    });
  } else {
    res.status(400);
    console.log("Invalid Credentials");
    // res.send(err);
    throw new Error("Invalid Credentials");
  }
});

export const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
};
export const getMe = asyncHandler(async (req, res) => {
  res.status(200);
  res.json(req.user);
});
export const deleteUserWithId = asyncHandler(async (req, res) => {
  User.remove({_id: req.params.UserId}, (err, User) => {
    if (err) {
      res.send(err);
    }
    // res.json({message: "Succesfully deleted User"});
    res.json(User);
  });
});
export const deleteAllUsers = asyncHandler(async (req, res) => {
  User.remove({}, (err, User) => {
    if (err) {
      res.send(err);
    }
    res.json(User);
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  User.find({}, (err, User) => {
    if (err) {
      res.send(err);
    }
    res.json(User);
  });
});
export const getUserWithId = asyncHandler(async (req, res) => {
  User.findById(req.params.UserId, (err, User) => {
    if (err) {
      res.send(err);
    }
    res.json(User);
  });
});
export const updatePlayer = asyncHandler(async (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.UserId},
    req.body,
    {new: true},
    (err, User) => {
      if (err) {
        res.send(err);
      }
      res.json(User);
    }
  );
});
