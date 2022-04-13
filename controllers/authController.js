const User = require("../models/userModel");
const AppError = require("../utils/appError");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = async (req, res, next) => {
  //create user in database
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if email and password is entered by user
    console.log("first check");
    if (!email || !password) {
      return next(new AppError("Please Provide Email and password", 400));
    }

    //check if user exist in DB and password is correct

    console.log("second check");
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Email or password is Incorrect", 401));
    }

    console.log("third check");
    //if everything is alright send token

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 'Bearer kjshdf97sydfkjsdhf79sdfkjhbsdf9'

    // get the token from the user as bearer token

    let token;

    if (req.headers.authorization && req.authorization.startsWith("Bearer")) {
      token = req.header.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not Logged in PLease Log in to continue!", 401)
      );
    }

    //verify the token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user exist

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exist!", 401)
      );
    }

    // check if user changed password after the token is issued
    // yet to be implemented

    //Grant Access

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
