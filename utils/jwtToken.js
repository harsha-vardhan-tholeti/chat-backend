const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 1 * 60 * 60 * 100
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
