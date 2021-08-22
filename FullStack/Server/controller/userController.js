const HttpError = require("../ErrorModel/errorModel");
const User = require("../models/UserModel");

//Users getAll
const getUsersAll = async (req, res, next) => {
    let usersAll;
    try {
      usersAll = await User.find();
    } catch (err) {
      const error = new HttpError(
        "Fetching users failed, please try again later.",
        500
      );
      return next(error);
    }
    res.json({ usersAll });
  };

  
//SignUp
const signup = async (req, res, next) => {
  
  const { name, email, firstName, lastName, address } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  //CreateUser
  const createdUser = new User({
    name,
    email,
    firstName,
    lastName,
    address,
    places: [],
  }); 

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ Message: "Sign Up Succesful" });

};

module.exports = { signup,getUsersAll };