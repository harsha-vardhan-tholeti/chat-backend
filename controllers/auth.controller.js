const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

// Register User
const RegisterUser = async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: user,
  });
};

// Login User
const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid username or password",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid username or password",
    });
  }

  sendToken(user, 200, res);
};

module.exports = {
  RegisterUser,
  LoginUser,
};
