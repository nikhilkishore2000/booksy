const express = require("express");
const { sendOtpController } = require("../controllers/auth.controller");

const router = express.Router();

// POST /api/auth/send-otp
router.post("/send-otp", sendOtpController);

module.exports = router;
