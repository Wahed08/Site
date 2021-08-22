const HttpError = require("../ErrorModel/errorModel");
const User = require("../models/UserModel");
const Profile = require("../models/ProfileModel");

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

//getUserById
const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
  
    let user;
    try {
      user = await User.findById(userId).populate('profile');
    } catch (err) {
      const error = new HttpError(
        'Fetching user failed, please try again later',
        500
      );
      return next(error);
    }
  
    res.json({user});
  };


//getProfileById
let profileId;
const getProfileById = async (req, res, next) => {
     profileId = req.params.pid;
  
    let userProfile;
    try {
      userProfile = await Profile.findById(profileId);
    } catch (err) {
      const error = new HttpError(
        'Fetching user failed, please try again later',
        500
      );
      return next(error);
    }
  
    res.json({userProfile});
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
    places: [],
  });


  //CreateProfile
  const createdProfile = new Profile({
    firstName,
    lastName,
    address,
  });

  try {
    // await createdUser.save();
    await createdProfile.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again..", 500);
    return next(error);
  }

  ///////
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    userId.profile.push(createdProfile);
    await userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }
  ////
  res.status(201).json({ Message: "Sign Up Succesful" });
};


module.exports = { signup, getUsersAll, getUserById, getProfileById};
