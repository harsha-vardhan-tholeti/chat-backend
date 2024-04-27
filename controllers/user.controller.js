const User = require("../models/user.model");
const createError = require("../utils/createError");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) return next(createError("Users not found", 400));
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentUser = async (req, res, next) => {
  try {
    const { username, name, email, bio, profilePic } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        name,
        email,
        bio,
        profilePic,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateUserPassword = await User.findByIdAndUpdate(
      req.user._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updateUserPassword,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
};
