const User = require("../models/user.model");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  if (!req.headers.cookie && !req.headers.cookie.includes("token")) {
    return next(createError("Invalid authorization", 400));
  }

  let token;

  if (req.headers.cookie && req.headers.cookie.includes("token")) {
    token = req.headers.cookie.slice(6);
  }

  if (!token) return next(createError("User not authenticated", 401));

  let userId;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return next(createError("jwt expired", 400));
    } else {
      userId = decoded._id || decoded.id;
    }
  });

  const user = await User.findById(userId);

  if (!user) return next(createError("User not found", 404));

  req.user = user;

  next();
};

module.exports = {
  protect,
};
