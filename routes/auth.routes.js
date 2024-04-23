const express = require("express");

const { signup, signIn } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signIn", signIn);

module.exports = router;
