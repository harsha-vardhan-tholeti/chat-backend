const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken");

const signup = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || username.length === 0)
      return res.status(400).json({ error: "Please Provide Username" });

    if (!name || name.length === 0)
      return res.status(400).json({ error: "Please Provide Name" });

    if (!email || email.length === 0)
      return res.status(400).json({ error: "Please Provide Email" });

    if (!password || password.length === 0)
      return res.status(400).json({ error: "Please Provide Password" });

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
    console.log("Error in sign up " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || username.length === 0)
      return res.status(400).json({ error: "Please Provide Username" });

    if (!password || password.length === 0)
      return res.status(400).json({ error: "Please Provide Password" });

    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(400).json({ error: "User does not exists" });

    sendToken(existingUser, 200, res);
  } catch (error) {
    console.log("Error in sign in " + error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  signIn,
};
