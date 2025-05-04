const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  registerUser
);

router.post("/login", loginUser);
router.get("/verify", protect, verifyToken);

module.exports = router;
