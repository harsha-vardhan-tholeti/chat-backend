const express = require("express");
const { protect } = require("../middlewares/authorization.middleware");
const {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/getMe", protect, getCurrentUser);
router.post("/updateMe", protect, updateCurrentUser);
router.post("/updatePassword", protect, updateCurrentUserPassword);

module.exports = router;
