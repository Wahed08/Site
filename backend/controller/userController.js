const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Users Fetching
const getUsersAll = async (req, res, next) => {
  let usersAll;
  try {
    usersAll = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ usersAll: usersAll.map((user) => user.toObject({ getters: true }))});
};

//User Fetching By Id
const getUsers = async (req, res, next) => {
  const userId = req.params.uid;

  let users;
  try {
    users = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!users) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ users: users});
};

//user SignUp
const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }
  const { name, email, password, password2 } = req.body;

  //password match
  if (password !== password2) {
    const error = new HttpError(
      "Password does not match, please try again",
      423
    );
    return next(error);
  }
  //checking existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing Up failed, Please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please create new one",
      422
    );
    return next(error);
  }

  // hashed password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again later",
      500
    );
    return next(error);
  }

  //create User
  const createUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // save to db
  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing Up failed, please try again later",
      501
    );
    return next(error);
  }

  res.status(201).json({ Message: "Sign Up Succesful" });
};

// log In
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  //password compare
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your data and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid Credentials, could not log you in",
      401
    );
    return next(error);
  }
  //token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.Secret_Key,
      { expiresIn: "1hr" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};


//deleteUser
const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findByIdAndDelete(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for this id.', 404);
    return next(error);
  }


  res.status(200).json({ message: 'Deleted User.' });
};

module.exports = {
  getUsersAll,
  getUsers,
  signUp,
  login,
  deleteUser
};
