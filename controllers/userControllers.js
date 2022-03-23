import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
import chalk from "chalk";

import {UserSchema} from "../models/userModel";

const warning = chalk.hex("#FFA500");
const one = chalk.hex("#00a1be");
const two = chalk.hex("#beb100");
const three = chalk.hex("#eb51d6");

const User = mongoose.model("User", UserSchema);

export const addNewUser = asyncHandler(async (req, res) => {
  let {firstName, lastName, email, phone, isdoctor, password} = req.body;

  //? This is in order for the Admin user to create Users with a default password,
  //? it should be changed the first time the user enters
  //! Do not do this

  if (password === undefined /*and the user is type Admin*/) {
    password = "default";
  }
  //? Validate that the form is sending all the data
  // if (!firstName || !lastName || !email) {
  //   req.status(400);
  //   throw new Error("please ");
  // }

  //? Prevent duplicate accounts
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error(warning("User already exists"));
  }

  const saltRounds = 10;
  let hashedPassword;
  bcrypt.hash(password, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    console.log(`📞  hash inside bcrypt function=>  ${hash}`);
    hashedPassword = hash;
    const createdUser = new User(req.body);
    createdUser.password = hashedPassword;

    createdUser.token = generateToken(createdUser._id);
    console.log(`🙌  Created User Token =>  ${createdUser.token}`);
    console.log(`🎂  Created User =>  ${createdUser}`);
    createdUser.save((err, createdUser) => {
      if (err) {
        res.status(400);
        res.send(err);
        throw new Error("Invalid User Data");
      }
      console.log(
        `🎶  createdUser the one that is sent to the DB=>  ${createdUser}`
      );
      res.json(createdUser);
      res.status(201);
    });
  });

  console.log(`😎  password outside =>  ${password}`);
  console.log(`🌹  hashedPassword outside =>  ${hashedPassword}`);
});

export const loginUser = asyncHandler(async (req, res) => {
  //Finish the login functionality 22:39

  const {email, password, _id} = req.body;

  const user = await User.findOne({email});
  console.log(one(`email=>  ${email}`));

  console.log(two(`password=>  ${password}`));

  // console.log(three(`user=>  ${user}`));

  if (user && (await bcrypt.compare(password, user.password))) {
    // user
    // user.token = generateToken(user._id);
    user.token = generateToken(_id);
    console.log(three(`user=>  ${user}`));
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
  const {firstName, lastName, email, phone, isdoctor, _id} = await User.findById(
    console.log(one(`req.user._id=>  ${req.user._id}`)),
    req.user._id
  );

  req.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
  });
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
