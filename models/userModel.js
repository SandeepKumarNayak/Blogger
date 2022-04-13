const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User must have a name"],
  },
  email: {
    type: String,
    required: [true, "A User must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide confirm password"],
    validate: {
      //this works only in save and update
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not same!",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//instance methods

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Hooks

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //hash the password

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
