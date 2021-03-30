const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const HttpError = require('../model/http-error');

//user SignUp
const signUp = async (req, res, next) => {

    const { name, email, password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        const error = new HttpError('Signing Up failed, Please try again later',500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'User already exists, please create new one',
            422
        )
        return next(error);
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        const error = new HttpError(
            'Could not create user, please try again later',
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

    try{
        await createUser.save();
    }catch(err){
        const error = new HttpError(
            'Signing Up failed, please try again later',
            500
        );
        return next(error);
    }

    res
    .status(201)
    .json({msg: "Successful"});

}

module.exports = {
    signUp
}