const express = require("express");
const {
  registerUser,
  login,
  registerOrg,
  verifyOrg
} = require("../controllers/authController");
const auth = require("../middleware/auth");
const tenant = require("../middleware/tenant");
const User = require("../models/User");

const router = express.Router();

/**
 * Get Logged-In User Profile
 * Protected Route
 */
router.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

/**
 * Auth Routes
 */

// SUPER ADMIN - ORG REGISTRATION
router.post("/register-org", registerOrg);

// EMPLOYEE SELF REGISTRATION
router.post("/register", registerUser);

// LOGIN
router.post("/login", login);

// VERIFY ORG (NOT NEEDED IN DEV)
router.get("/verify-org/:token", verifyOrg);

/**
 * Fetch Users Under Same Organization (Protected + Tenant-Aware)
 */
router.get("/users", auth, tenant, async (req, res) => {
  try {
    const users = await User.find({ organizationId: req.user.organizationId });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
