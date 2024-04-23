const express = require("express");

const { signup, signIn, signOut } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signIn", signIn);
router.post("/signOut", signOut);

module.exports = router;
