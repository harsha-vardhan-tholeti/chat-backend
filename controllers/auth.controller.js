const User = require("../models/user.model");
const createError = require("../utils/createError");
const sendToken = require("../utils/jwtToken");

const signup = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || username.length === 0)
      return next(createError("Please Provide Username", 400));

    if (!name || name.length === 0)
      return next(createError("Please Provide Name", 400));

    if (!email || email.length === 0)
      return next(createError("Please Provide Email", 400));

    if (!password || password.length === 0)
      return next(createError("Please Provide Password", 400));

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({
      username,
      name,
      email,
      password,
    });

    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || username.length === 0)
      return next(createError("Please Provide Username", 400));

    if (!password || password.length === 0)
      return next(createError("Please Provide Password", 400));

    const existingUser = await User.findOne({ username });

    if (!existingUser) return next(createError("User does not exists", 400));

    sendToken(existingUser, 200, res);
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signIn,
  signOut,
};
